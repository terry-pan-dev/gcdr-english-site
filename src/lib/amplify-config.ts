// AWS Amplify configuration module
// Initializes Amplify with Cognito UserPool and IdentityPool configuration

import { Amplify } from "aws-amplify";
import { cognitoUserPoolsTokenProvider } from "aws-amplify/auth/cognito";
import { sessionStorage } from "aws-amplify/utils";
import { shouldShowDebugLogs } from "./env";

// Cache for Amplify configuration
let amplifyConfigured = false;
let configRetryPromise: Promise<boolean> | null = null;

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
  if (shouldShowDebugLogs()) {
    console.warn("Cognito config not available:", {
      userPoolId: !!userPoolId,
      clientId: !!clientId,
    });
  }
  return null;
};

/**
 * Waits for window globals to be available (with retry)
 * Useful when Astro pages haven't injected globals yet
 */
const waitForWindowGlobals = async (
  maxRetries = 5,
  delayMs = 200
): Promise<boolean> => {
  if (typeof window === "undefined") {
    return false;
  }

  for (let i = 0; i < maxRetries; i++) {
    const win = window as any;
    const hasUserPoolId = !!win.__COGNITO_USER_POOL_ID__;
    const hasClientId = !!win.__COGNITO_USER_POOL_CLIENT_ID__;

    if (hasUserPoolId && hasClientId) {
      if (shouldShowDebugLogs()) {
        console.log(
          `Amplify config: Window globals available after ${i + 1} attempt(s)`
        );
      }
      return true;
    }

    if (i < maxRetries - 1) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  return false;
};

/**
 * Configures AWS Amplify with Cognito UserPool and IdentityPool (synchronous)
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
        "Amplify config not available - window globals may not be set or env vars missing"
      );
      return false;
    }

    if (shouldShowDebugLogs()) {
      console.log("Configuring Amplify with:", {
        userPoolId: config.userPoolId,
        clientId: config.clientId ? "***" : "missing",
        identityPoolId: config.identityPoolId || "(not set)",
        region: config.region,
      });
    }

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

    if (shouldShowDebugLogs()) {
      console.log(
        "Calling Amplify.configure with:",
        JSON.stringify(amplifyConfig, null, 2)
      );
    }
    Amplify.configure(amplifyConfig);

    // Security: Use sessionStorage instead of localStorage for tokens
    // Tokens are cleared when browser tab/window closes, reducing risk of token theft
    // This is especially important for admin panels
    cognitoUserPoolsTokenProvider.setKeyValueStorage(sessionStorage);

    // Verify configuration was applied (only when debug logs enabled)
    if (shouldShowDebugLogs()) {
      const currentConfig = Amplify.getConfig();
      console.log(
        "Amplify getConfig result:",
        JSON.stringify(currentConfig, null, 2)
      );
    }

    amplifyConfigured = true;
    if (shouldShowDebugLogs()) {
      console.log("Amplify configured successfully");
    }
    return true;
  } catch (error: any) {
    console.error("Failed to configure Amplify:", error.message || error);
    return false;
  }
};

/**
 * Configures AWS Amplify asynchronously with retry logic
 * Waits for window globals to be available if needed
 * Use this when you know window globals might not be ready yet
 */
export const configureAmplifyAsync = async (): Promise<boolean> => {
  if (amplifyConfigured) {
    return true;
  }

  // If there's already a retry in progress, wait for it
  if (configRetryPromise) {
    return configRetryPromise;
  }

  // Start new async configuration
  configRetryPromise = (async () => {
    try {
      let config = loadCognitoConfig();

      // If config not available and we're in browser, try waiting for window globals
      if (!config && typeof window !== "undefined") {
        if (shouldShowDebugLogs()) {
          console.log("Amplify config: Waiting for window globals...");
        }
        const globalsAvailable = await waitForWindowGlobals();
        if (globalsAvailable) {
          // Retry loading config after globals are available
          config = loadCognitoConfig();
        }
      }

      if (!config) {
        console.warn(
          "Amplify config not available after retry - window globals may not be set or env vars missing"
        );
        configRetryPromise = null;
        return false;
      }

      // Use synchronous configure now that we have config
      const result = configureAmplify();
      configRetryPromise = null;
      return result;
    } catch (error: any) {
      console.error(
        "Failed to configure Amplify (async):",
        error.message || error
      );
      configRetryPromise = null;
      return false;
    }
  })();

  return configRetryPromise;
};

/**
 * Ensures Amplify is configured before use (synchronous)
 * Call this before any Amplify Auth operations
 * Returns true if configured, false otherwise
 *
 * If config is not immediately available, this returns false.
 * Components should handle this by:
 * 1. Waiting a bit and calling again, OR
 * 2. Using configureAmplifyAsync() for async retry logic
 */
export const ensureAmplifyConfigured = (): boolean => {
  if (amplifyConfigured) {
    return true;
  }

  // Try synchronous configuration
  return configureAmplify();
};
