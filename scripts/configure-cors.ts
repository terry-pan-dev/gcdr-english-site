#!/usr/bin/env tsx
/**
 * Script to configure CORS on Lambda Function URL
 * Run this after deploying: npx tsx scripts/configure-cors.ts
 */

import {
  LambdaClient,
  GetFunctionUrlConfigCommand,
  UpdateFunctionUrlConfigCommand,
} from "@aws-sdk/client-lambda";

const REGION = "ap-southeast-2";
// SST function names are prefixed with the app name and stage
// Format: {app}-{stage}-{functionName}
// You may need to adjust this based on your SST deployment
const FUNCTION_NAME = process.env.FUNCTION_NAME || process.argv[2] || "gcdr-website-dev-AdminAPI";

async function configureCORS() {
  const client = new LambdaClient({ region: REGION });

  try {
    // Get current function URL config
    const getConfig = new GetFunctionUrlConfigCommand({
      FunctionName: FUNCTION_NAME,
    });
    const config = await client.send(getConfig);

    if (!config.FunctionUrl) {
      console.error("Function URL not found. Make sure the function is deployed.");
      process.exit(1);
    }

    console.log(`Found Function URL: ${config.FunctionUrl}`);

    // Update CORS configuration
    const updateConfig = new UpdateFunctionUrlConfigCommand({
      FunctionName: FUNCTION_NAME,
      Cors: {
        AllowCredentials: false,
        AllowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        AllowOrigins: ["*"],
        AllowHeaders: ["Content-Type", "Authorization"],
        MaxAge: 3600,
      },
    });

    await client.send(updateConfig);
    console.log("✅ CORS configured successfully!");
    console.log("CORS settings:");
    console.log("  - AllowOrigins: *");
    console.log("  - AllowMethods: GET, POST, PUT, DELETE, OPTIONS");
    console.log("  - AllowHeaders: Content-Type, Authorization");
  } catch (error: any) {
    console.error("Error configuring CORS:", error.message);
    if (error.name === "ResourceNotFoundException") {
      console.error(
        `Function '${FUNCTION_NAME}' not found. Make sure you're using the correct function name.`
      );
    }
    process.exit(1);
  }
}

configureCORS();

