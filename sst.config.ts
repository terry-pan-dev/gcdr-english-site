/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "gcdr-website",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
      region: "ap-southeast-2",
    };
  },
  async run() {
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

    // Create Cognito Identity Pool for AWS credentials
    // This enables authenticated users to get temporary AWS credentials
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
            resources: ["*"], // Allow invoking any Lambda function (can be restricted to specific functions)
          },
        ],
      },
    });

    // Single Lambda Function for all API endpoints
    const apiFn = new sst.aws.Function("AdminAPI", {
      handler: "src/functions/api/handler.handler",
      url: {
        cors: {
          allowOrigins: ["*"], // Allow all origins (can be restricted to specific domains in production)
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

    // Create Astro with API URL and Cognito config as environment variables
    const astro = new sst.aws.Astro("GCDR", {
      environment: {
        PUBLIC_API_BASE_URL: apiFn.url,
        PUBLIC_COGNITO_USER_POOL_ID: userPool.id,
        PUBLIC_COGNITO_USER_POOL_CLIENT_ID: userPoolClient.id,
        PUBLIC_COGNITO_IDENTITY_POOL_ID: identityPool.id,
        PUBLIC_AWS_REGION: "ap-southeast-2",
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
