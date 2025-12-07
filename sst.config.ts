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

    // Cognito User Pool for authentication
    const userPool = new sst.aws.CognitoUserPool("AdminUserPool", {
      usernames: ["email"],
      // Users will be created manually, so no self-registration
    });

    // Create a client for the user pool
    const userPoolClient = userPool.addClient("AdminClient");

    // Single Lambda Function for all API endpoints
    const apiFn = new sst.aws.Function("AdminAPI", {
      handler: "src/functions/api/handler.handler",
      url: true,
      environment: {
        BLOG_POSTS_TABLE: blogPostsTable.name,
        BLOG_STORAGE_BUCKET: blogStorage.name,
        MEDIA_ASSETS_TABLE: mediaAssetsTable.name,
        MEDIA_STORAGE_BUCKET: mediaStorage.name,
        COGNITO_USER_POOL_ID: userPool.id,
        COGNITO_USER_POOL_CLIENT_ID: userPoolClient.id,
        AWS_REGION: "ap-southeast-2",
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
      },
    };
  },
});
