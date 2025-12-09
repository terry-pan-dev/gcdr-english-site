// AWS Amplify configuration module
// Initializes Amplify with Cognito UserPool and IdentityPool configuration

import { Amplify } from "aws-amplify";

// Cache for Amplify configuration
let amplifyConfigured = false;

// Load Cognito configuration from environment or window globals
const loadCognitoConfig = (): {
  userPoolId: string;
  clientId: string;
  identityPoolId: string;
  region: string;
} | null => {
  let userPoolId = "";
  let clientId = "";
  let identityPoolId = "";
  let region = "ap-southeast-2";

  // Try to get from window first (injected by Astro pages)
  if (typeof window !== "undefined") {
    const win = window as any;
    userPoolId = win.__COGNITO_USER_POOL_ID__ || "";
    clientId = win.__COGNITO_USER_POOL_CLIENT_ID__ || "";
    identityPoolId = win.__COGNITO_IDENTITY_POOL_ID__ || "";
    region = win.__AWS_REGION__ || "ap-southeast-2";
  }

  // Fall back to environment variables if window globals not set
  if (!userPoolId) {
    userPoolId = import.meta.env.PUBLIC_COGNITO_USER_POOL_ID || "";
  }
  if (!clientId) {
    clientId = import.meta.env.PUBLIC_COGNITO_USER_POOL_CLIENT_ID || "";
  }
  if (!identityPoolId) {
    identityPoolId = import.meta.env.PUBLIC_COGNITO_IDENTITY_POOL_ID || "";
  }
  if (!region || region === "ap-southeast-2") {
    region = import.meta.env.PUBLIC_AWS_REGION || "ap-southeast-2";
  }

  // UserPool ID and Client ID are required, Identity Pool is optional
  if (userPoolId && clientId) {
    return { userPoolId, clientId, identityPoolId, region };
  }

  // Return null if required config not available yet
  console.warn("Cognito config not available:", {
    userPoolId: !!userPoolId,
    clientId: !!clientId,
  });
  return null;
};

/**
 * Configures AWS Amplify with Cognito UserPool and IdentityPool
 * This should be called before using any Amplify Auth methods
 * Safe to call multiple times (will only configure once)
 */
export const configureAmplify = (): boolean => {
  if (amplifyConfigured) {
    return true;
  }

  try {
    const config = loadCognitoConfig();

    if (!config) {
      console.warn(
        "Amplify config not available yet - window globals may not be set"
      );
      return false;
    }

    console.log("Configuring Amplify with:", {
      userPoolId: config.userPoolId,
      clientId: config.clientId ? "***" : "missing",
      identityPoolId: config.identityPoolId || "(not set)",
      region: config.region,
    });

    // Use legacy configuration format (more reliable with Amplify v6)
    // This format uses snake_case keys that Amplify recognizes
    const amplifyConfig: Record<string, any> = {
      aws_project_region: config.region,
      aws_cognito_region: config.region,
      aws_user_pools_id: config.userPoolId,
      aws_user_pools_web_client_id: config.clientId,
    };

    // Add identity pool if available
    if (config.identityPoolId) {
      amplifyConfig.aws_cognito_identity_pool_id = config.identityPoolId;
    }

    console.log(
      "Calling Amplify.configure with:",
      JSON.stringify(amplifyConfig, null, 2)
    );
    Amplify.configure(amplifyConfig);

    // Verify configuration was applied
    const currentConfig = Amplify.getConfig();
    console.log(
      "Amplify getConfig result:",
      JSON.stringify(currentConfig, null, 2)
    );

    amplifyConfigured = true;
    console.log("Amplify configured successfully");
    return true;
  } catch (error: any) {
    console.error("Failed to configure Amplify:", error.message || error);
    return false;
  }
};

/**
 * Ensures Amplify is configured before use
 * Call this before any Amplify Auth operations
 * Returns true if configured, false otherwise
 */
export const ensureAmplifyConfigured = (): boolean => {
  if (!amplifyConfigured) {
    return configureAmplify();
  }
  return true;
};
