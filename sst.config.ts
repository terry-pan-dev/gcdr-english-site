/// <reference path="./.sst/platform/config.d.ts" />

// Store stage globally so run() can access it
let currentStage = "dev";

export default $config({
  app(input) {
    // Store the stage for use in run()
    currentStage = input?.stage || "dev";
    return {
      name: "gcdr-website",
      removal: currentStage === "production" ? "retain" : "remove",
      home: "aws",
      region: "ap-southeast-2",
    };
  },
  async run() {
    // Use the stage stored from app() function
    // Only production stage deployments will have PUBLIC_IS_PRODUCTION = "true"
    const isProduction = currentStage === "production";

    // CORS configuration
    // Using wildcard ["*"] because:
    // 1. Lambda Function URLs are unpredictable and change between deployments
    // 2. API is protected by Cognito JWT authentication tokens (not by origin)
    // 3. Makes development easier without needing to update CORS on each deploy
    // Security: The endpoint is protected by requiring valid Cognito access tokens in the Authorization header
    const allowedOrigins = ["*"];
    // DynamoDB Tables
    const blogPostsTable = new sst.aws.Dynamo("BlogPosts", {
      fields: {
        id: "string",
      },
      primaryIndex: {
        hashKey: "id",
      },
    });

    const mediaAssetsTable = new sst.aws.Dynamo("MediaAssets", {
      fields: {
        id: "string",
      },
      primaryIndex: {
        hashKey: "id",
      },
    });

    // S3 Buckets
    const blogStorage = new sst.aws.Bucket("BlogStorage", {
      public: false,
    });

    const mediaStorage = new sst.aws.Bucket("MediaStorage", {
      public: true,
    });

    const userPool = new sst.aws.CognitoUserPool("AdminUserPool", {
      usernames: ["email"],
      // Users will be created manually, so no self-registration
      transform: {
        userPool: (args, opts) => {
          args.schemas = [
            ...(Array.isArray(args.schemas) ? args.schemas : []),
            {
              name: "custom:role", // Must start with "custom:"
              attributeDataType: "String", // Options: String, Number, DateTime, Boolean
              developerOnlyAttribute: false, // Set true if only accessible via Admin APIs
              mutable: true, // Allow updates after signup
              required: false, // Not required during signup
              stringAttributeConstraints: {
                maxLength: "50", // Optional: Enforce length (1-2048 chars)
                minLength: "1",
              },
            },
          ];
        },
      },
    });

    // Create a client for the user pool
    // Note: If using an existing user pool, this will add a new client if one doesn't exist
    // If you have an existing client ID, you may need to handle it separately
    const userPoolClient = userPool.addClient("AdminClient");

    // Single Lambda Function for all API endpoints
    const apiFn = new sst.aws.Function("AdminAPI", {
      handler: "src/functions/api/handler.handler",
      url: {
        cors: {
          // Security: Restrict CORS origins - use wildcard only in dev, specific domains in production
          allowOrigins: allowedOrigins.length > 0 ? allowedOrigins : ["*"], // Fallback to wildcard if no origins configured
          allowMethods: ["GET", "POST", "PUT", "DELETE"], // OPTIONS is handled automatically by Lambda Function URL
          allowHeaders: ["Content-Type", "Authorization"],
          allowCredentials: false,
          maxAge: "3600 seconds",
        },
      },
      environment: {
        BLOG_POSTS_TABLE: blogPostsTable.name,
        BLOG_STORAGE_BUCKET: blogStorage.name,
        MEDIA_ASSETS_TABLE: mediaAssetsTable.name,
        MEDIA_STORAGE_BUCKET: mediaStorage.name,
        COGNITO_USER_POOL_ID: userPool.id,
        COGNITO_USER_POOL_CLIENT_ID: userPoolClient.id,
      },
      link: [
        blogPostsTable,
        blogStorage,
        mediaAssetsTable,
        mediaStorage,
        userPool,
      ],
    });

    // Create Cognito Identity Pool for AWS credentials
    // This enables authenticated users to get temporary AWS credentials
    // Created after apiFn so we can restrict permissions to only the Admin API
    const identityPool = new sst.aws.CognitoIdentityPool("AdminIdentityPool", {
      userPools: [
        {
          userPool: userPool.id,
          client: userPoolClient.id,
        },
      ],
      permissions: {
        authenticated: [
          {
            actions: ["lambda:InvokeFunction"],
            // Security: Restrict to only the Admin API function (principle of least privilege)
            resources: [$interpolate`${apiFn.arn}`],
          },
        ],
      },
    });

    // Create Astro with API URL and Cognito config as environment variables
    const astro = new sst.aws.Astro("GCDR", {
      path: "",
      dev: {
        command: "pnpm run dev",
        autostart: true,
        url: "http://localhost:4321",
      },
      buildCommand: "pnpm run build",
      link: [apiFn, blogPostsTable, blogStorage], // Link resources for blog access
      // Explicitly grant S3 permissions to the Astro server function
      // This ensures the SSR function can read blog content from S3
      permissions: [
        {
          actions: ["s3:GetObject", "s3:ListBucket"],
          resources: [
            $interpolate`${blogStorage.arn}`,
            $interpolate`${blogStorage.arn}/*`,
          ],
        },
      ],
      // Force CloudFront invalidation for all paths including dynamic blog routes
      invalidation: {
        paths: "all",
        wait: true, // Wait for invalidation to complete
      },
      environment: {
        PUBLIC_API_BASE_URL: apiFn.url,
        PUBLIC_COGNITO_USER_POOL_ID: userPool.id,
        PUBLIC_COGNITO_USER_POOL_CLIENT_ID: userPoolClient.id,
        PUBLIC_COGNITO_IDENTITY_POOL_ID: identityPool.id,
        PUBLIC_AWS_REGION: "ap-southeast-2",
        BLOG_POSTS_TABLE: blogPostsTable.name,
        BLOG_STORAGE_BUCKET: blogStorage.name,
        // Custom flag: Only production stage deployments should hide debug logs
        // All other stages (dev, staging, etc.) will show logs
        PUBLIC_IS_PRODUCTION: isProduction ? "true" : "false",
      },
    });

    return {
      astro: astro.url,
      api: {
        baseUrl: apiFn.url,
      },
      cognito: {
        userPoolId: userPool.id,
        clientId: userPoolClient.id,
        identityPoolId: identityPool.id,
      },
    };
  },
});
