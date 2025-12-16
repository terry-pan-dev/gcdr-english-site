import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  GetCommand,
  PutCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { CognitoJwtVerifier } from "aws-jwt-verify";
import { v4 as uuidv4 } from "uuid";

const dynamoClient = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(dynamoClient);
const s3Client = new S3Client({});

const COGNITO_USER_POOL_ID = process.env.COGNITO_USER_POOL_ID;
const COGNITO_USER_POOL_CLIENT_ID = process.env.COGNITO_USER_POOL_CLIENT_ID;

// Create JWT verifier (cached)
let jwtVerifier: ReturnType<typeof CognitoJwtVerifier.create> | null = null;

const getJwtVerifier = () => {
  if (jwtVerifier) {
    return jwtVerifier;
  }

  if (!COGNITO_USER_POOL_ID) {
    throw new Error("COGNITO_USER_POOL_ID environment variable is not set");
  }

  jwtVerifier = CognitoJwtVerifier.create({
    userPoolId: COGNITO_USER_POOL_ID,
    tokenUse: "access",
    ...(COGNITO_USER_POOL_CLIENT_ID && { clientId: COGNITO_USER_POOL_CLIENT_ID }),
  });

  return jwtVerifier;
};

// Blog handlers
async function handleBlogList() {
  const tableName = process.env.BLOG_POSTS_TABLE;
  if (!tableName) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Table name not configured" }),
    };
  }

  const command = new ScanCommand({ TableName: tableName });
  const result = await docClient.send(command);
  return {
    statusCode: 200,
    body: JSON.stringify({ blogs: result.Items || [] }),
  };
}

// Public blog list - returns only published blogs (no auth required)
async function handlePublicBlogList() {
  const tableName = process.env.BLOG_POSTS_TABLE;
  if (!tableName) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Table name not configured" }),
    };
  }

  const command = new ScanCommand({ TableName: tableName });
  const result = await docClient.send(command);

  // Filter only published blogs with current or past dates
  const now = new Date();
  const publishedBlogs = (result.Items || []).filter((blog: any) => {
    if (!blog.publish) return false;
    const postDate = new Date(blog.date);
    postDate.setHours(0, 0, 0, 0);
    const today = new Date(now);
    today.setHours(0, 0, 0, 0);
    return postDate <= today;
  });

  // Sort by pinned first, then by date (newest first)
  publishedBlogs.sort((a: any, b: any) => {
    const aPinned = a.pinned ?? false;
    const bPinned = b.pinned ?? false;
    if (aPinned !== bPinned) {
      return bPinned ? 1 : -1;
    }
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ blogs: publishedBlogs }),
  };
}

// Public blog get - returns single published blog (no auth required)
async function handlePublicBlogGet(id: string) {
  const tableName = process.env.BLOG_POSTS_TABLE;
  const bucketName = process.env.BLOG_STORAGE_BUCKET;

  if (!tableName || !bucketName) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Configuration missing" }),
    };
  }

  const command = new GetCommand({ TableName: tableName, Key: { id } });
  const result = await docClient.send(command);

  if (!result.Item) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: "Blog not found" }),
    };
  }

  // Check if blog is published
  if (!result.Item.publish) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: "Blog not found" }),
    };
  }

  // Check if blog date is in the past
  const postDate = new Date(result.Item.date);
  postDate.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (postDate > today) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: "Blog not found" }),
    };
  }

  // Get content from S3
  if (result.Item.s3Key) {
    try {
      const s3Command = new GetObjectCommand({
        Bucket: bucketName,
        Key: result.Item.s3Key,
      });
      const s3Result = await s3Client.send(s3Command);
      result.Item.content = (await s3Result.Body?.transformToString()) || "";
    } catch (_s3Error) {
      result.Item.content = "";
    }
  }

  return { statusCode: 200, body: JSON.stringify(result.Item) };
}

async function handleBlogGet(id: string) {
  const tableName = process.env.BLOG_POSTS_TABLE;
  const bucketName = process.env.BLOG_STORAGE_BUCKET;

  if (!tableName || !bucketName) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Configuration missing" }),
    };
  }

  const command = new GetCommand({ TableName: tableName, Key: { id } });
  const result = await docClient.send(command);

  if (!result.Item) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: "Blog not found" }),
    };
  }

  // Get content from S3
  if (result.Item.s3Key) {
    try {
      const s3Command = new GetObjectCommand({
        Bucket: bucketName,
        Key: result.Item.s3Key,
      });
      const s3Result = await s3Client.send(s3Command);
      result.Item.content = (await s3Result.Body?.transformToString()) || "";
    } catch (_s3Error) {
      result.Item.content = "";
    }
  }

  return { statusCode: 200, body: JSON.stringify(result.Item) };
}

async function handleBlogCreate(body: any) {
  const tableName = process.env.BLOG_POSTS_TABLE;
  const bucketName = process.env.BLOG_STORAGE_BUCKET;

  if (!tableName || !bucketName) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Configuration missing" }),
    };
  }

  const {
    title,
    subtitle,
    author,
    date,
    category,
    excerpt,
    image,
    featured,
    pinned,
    tags,
    publish,
    seo,
    content,
  } = body;

  if (!title || !author || !category || !excerpt || !content) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing required fields" }),
    };
  }

  const blogId = uuidv4();
  const s3Key = `blogs/${blogId}.mdx`;
  const now = new Date().toISOString();

  // Save to S3
  await s3Client.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: s3Key,
      Body: content,
      ContentType: "text/markdown",
    })
  );

  // Save to DynamoDB
  const blogItem = {
    id: blogId,
    title,
    subtitle: subtitle || "",
    author,
    date: date || now,
    category,
    excerpt,
    image: image || "",
    featured: featured || false,
    pinned: pinned || false,
    tags: tags || [],
    publish: publish || false,
    seo: seo || {},
    s3Key,
    createdAt: now,
    updatedAt: now,
  };

  await docClient.send(new PutCommand({ TableName: tableName, Item: blogItem }));

  return { statusCode: 201, body: JSON.stringify(blogItem) };
}

async function handleBlogUpdate(id: string, body: any) {
  const tableName = process.env.BLOG_POSTS_TABLE;
  const bucketName = process.env.BLOG_STORAGE_BUCKET;

  if (!tableName || !bucketName) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Configuration missing" }),
    };
  }

  // Get existing
  const getCommand = new GetCommand({ TableName: tableName, Key: { id } });
  const existing = await docClient.send(getCommand);

  if (!existing.Item) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: "Blog not found" }),
    };
  }

  // Update S3 if content provided
  const s3Key = existing.Item.s3Key || `blogs/${id}.mdx`;
  if (body.content !== undefined) {
    await s3Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: s3Key,
        Body: body.content,
        ContentType: "text/markdown",
      })
    );
  }

  // Update DynamoDB
  const updatedItem = {
    ...existing.Item,
    ...(body.title !== undefined && { title: body.title }),
    ...(body.subtitle !== undefined && { subtitle: body.subtitle }),
    ...(body.author !== undefined && { author: body.author }),
    ...(body.date !== undefined && { date: body.date }),
    ...(body.category !== undefined && { category: body.category }),
    ...(body.excerpt !== undefined && { excerpt: body.excerpt }),
    ...(body.image !== undefined && { image: body.image }),
    ...(body.featured !== undefined && { featured: body.featured }),
    ...(body.pinned !== undefined && { pinned: body.pinned }),
    ...(body.tags !== undefined && { tags: body.tags }),
    ...(body.publish !== undefined && { publish: body.publish }),
    ...(body.seo !== undefined && { seo: body.seo }),
    s3Key,
    updatedAt: new Date().toISOString(),
  };

  await docClient.send(new PutCommand({ TableName: tableName, Item: updatedItem }));

  return { statusCode: 200, body: JSON.stringify(updatedItem) };
}

async function handleBlogDelete(id: string) {
  const tableName = process.env.BLOG_POSTS_TABLE;
  const bucketName = process.env.BLOG_STORAGE_BUCKET;

  if (!tableName || !bucketName) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Configuration missing" }),
    };
  }

  // Get to find S3 key
  const getCommand = new GetCommand({ TableName: tableName, Key: { id } });
  const existing = await docClient.send(getCommand);

  if (!existing.Item) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: "Blog not found" }),
    };
  }

  // Delete from S3
  if (existing.Item.s3Key) {
    try {
      await s3Client.send(
        new DeleteObjectCommand({
          Bucket: bucketName,
          Key: existing.Item.s3Key,
        })
      );
    } catch (_s3Error) {
      // Continue even if S3 delete fails
    }
  }

  // Delete from DynamoDB
  await docClient.send(new DeleteCommand({ TableName: tableName, Key: { id } }));

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Blog deleted successfully" }),
  };
}

// Media handlers
async function handleMediaList() {
  const tableName = process.env.MEDIA_ASSETS_TABLE;
  if (!tableName) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Table name not configured" }),
    };
  }

  const command = new ScanCommand({ TableName: tableName });
  const result = await docClient.send(command);
  return {
    statusCode: 200,
    body: JSON.stringify({ media: result.Items || [] }),
  };
}

async function handleMediaUpload(body: any) {
  const tableName = process.env.MEDIA_ASSETS_TABLE;
  const bucketName = process.env.MEDIA_STORAGE_BUCKET;

  if (!tableName || !bucketName) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Configuration missing" }),
    };
  }

  const { filename, type, size } = body;
  if (!filename || !type) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Filename and type are required" }),
    };
  }

  // Validate file size (max 1MB)
  const MAX_FILE_SIZE = 1024 * 1024; // 1MB in bytes
  if (size && size > MAX_FILE_SIZE) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: `File size exceeds the maximum limit of 1MB. File size: ${(size / (1024 * 1024)).toFixed(2)}MB`,
      }),
    };
  }

  const mediaId = uuidv4();
  const fileExtension = filename.split(".").pop() || "";
  const s3Key = `media/${type}/${mediaId}-${filename}`;
  const contentType =
    type === "image"
      ? `image/${fileExtension === "jpg" ? "jpeg" : fileExtension}`
      : `video/${fileExtension}`;

  // Generate presigned URL
  const putCommand = new PutObjectCommand({
    Bucket: bucketName,
    Key: s3Key,
    ContentType: contentType,
  });
  const uploadUrl = await getSignedUrl(s3Client, putCommand, {
    expiresIn: 3600,
  });

  const region = process.env.AWS_REGION || "ap-southeast-2";
  const publicUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${s3Key}`;

  // Save metadata
  const mediaItem = {
    id: mediaId,
    filename,
    s3Key,
    url: publicUrl,
    type,
    size: size || 0,
    uploadedAt: new Date().toISOString(),
  };

  await docClient.send(new PutCommand({ TableName: tableName, Item: mediaItem }));

  return {
    statusCode: 200,
    body: JSON.stringify({ uploadUrl, media: mediaItem }),
  };
}

async function handleMediaDelete(id: string) {
  const tableName = process.env.MEDIA_ASSETS_TABLE;
  const bucketName = process.env.MEDIA_STORAGE_BUCKET;

  if (!tableName || !bucketName) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Configuration missing" }),
    };
  }

  // Get to find S3 key
  const getCommand = new GetCommand({ TableName: tableName, Key: { id } });
  const existing = await docClient.send(getCommand);

  if (!existing.Item) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: "Media not found" }),
    };
  }

  // Delete from S3
  if (existing.Item.s3Key) {
    try {
      await s3Client.send(
        new DeleteObjectCommand({
          Bucket: bucketName,
          Key: existing.Item.s3Key,
        })
      );
    } catch (_s3Error) {
      // Continue even if S3 delete fails
    }
  }

  // Delete from DynamoDB
  await docClient.send(new DeleteCommand({ TableName: tableName, Key: { id } }));

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Media deleted successfully" }),
  };
}

// Helper function to verify Cognito access token using JWT verification
// This is faster and more efficient than GetUserCommand (no API call needed)
async function verifyCognitoToken(
  accessToken: string
): Promise<{ email: string; sub: string } | null> {
  try {
    const verifier = getJwtVerifier();

    // Verify token locally (checks signature, expiration, issuer, audience)
    const payload = await verifier.verify(accessToken);

    // Extract user information from JWT payload
    const email = (payload.email as string) || (payload.username as string) || "";
    const sub = payload.sub as string;

    if (!sub) {
      return null;
    }

    return { email, sub };
  } catch (error: any) {
    // Handle specific error types
    if (error.name === "TokenExpiredError") {
      console.error("Token verification error: Token has expired");
    } else if (error.name === "TokenInvalidError") {
      console.error("Token verification error: Token is invalid");
    } else {
      console.error("Token verification error:", error.message || error);
    }
    return null;
  }
}

// Helper function to extract token from Authorization header
function extractToken(event: any): string | null {
  const authHeader = event.headers?.authorization || event.headers?.Authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  return authHeader.substring(7);
}

// Auth handler - now just returns success, actual auth happens client-side with Cognito
async function handleAuthLogin(_body: any) {
  // This endpoint is no longer needed for Cognito authentication
  // Authentication happens directly in the browser with Cognito
  // But we keep it for backward compatibility or can remove it
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Use Cognito authentication directly from client",
    }),
  };
}

// Main handler
export async function handler(event: any) {
  const method = event.requestContext?.http?.method || event.httpMethod || "GET";
  const rawPath = event.requestContext?.http?.path || event.rawPath || event.path || "/";
  const body = event.body
    ? typeof event.body === "string"
      ? JSON.parse(event.body)
      : event.body
    : {};

  // CORS is handled automatically by Lambda Function URL (configured in sst.config.ts)
  // Do not add CORS headers manually as it causes duplicate headers
  // OPTIONS preflight requests are also handled automatically by Function URL

  try {
    // Public routes (no auth required)
    const isPublicRoute = rawPath.startsWith("/api/public/");

    // Check authentication for protected routes (all routes except login and public routes)
    if (!rawPath.startsWith("/api/admin/auth/login") && !isPublicRoute) {
      const token = extractToken(event);
      if (!token) {
        return {
          statusCode: 401,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ error: "Unauthorized: No token provided" }),
        };
      }

      const user = await verifyCognitoToken(token);
      if (!user) {
        return {
          statusCode: 401,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ error: "Unauthorized: Invalid token" }),
        };
      }
    }

    let result;

    // Parse path to extract IDs
    // Path format: /api/admin/blogs/{id} or /api/admin/media/{id}
    const pathParts = rawPath.split("/").filter(Boolean);
    const id = pathParts[pathParts.length - 1];
    const isIdRoute = id && id !== "blogs" && id !== "media" && id !== "admin" && id !== "api";

    // Route based on path
    // Public routes (no auth required)
    if (rawPath.startsWith("/api/public/blogs")) {
      if (method === "GET" && isIdRoute) {
        result = await handlePublicBlogGet(id);
      } else if (method === "GET") {
        result = await handlePublicBlogList();
      } else {
        result = {
          statusCode: 405,
          body: JSON.stringify({ error: "Method not allowed" }),
        };
      }
    } else if (rawPath.startsWith("/api/admin/auth/login") && method === "POST") {
      result = await handleAuthLogin(body);
    } else if (rawPath.startsWith("/api/admin/blogs")) {
      if (method === "GET" && isIdRoute) {
        result = await handleBlogGet(id);
      } else if (method === "GET") {
        result = await handleBlogList();
      } else if (method === "POST") {
        result = await handleBlogCreate(body);
      } else if (method === "PUT" && isIdRoute) {
        result = await handleBlogUpdate(id, body);
      } else if (method === "DELETE" && isIdRoute) {
        result = await handleBlogDelete(id);
      } else {
        result = {
          statusCode: 405,
          body: JSON.stringify({ error: "Method not allowed" }),
        };
      }
    } else if (rawPath.startsWith("/api/admin/media")) {
      if (method === "GET") {
        result = await handleMediaList();
      } else if (method === "POST") {
        result = await handleMediaUpload(body);
      } else if (method === "DELETE" && isIdRoute) {
        result = await handleMediaDelete(id);
      } else {
        result = {
          statusCode: 405,
          body: JSON.stringify({ error: "Method not allowed" }),
        };
      }
    } else {
      result = {
        statusCode: 404,
        body: JSON.stringify({ error: "Not found" }),
      };
    }

    return {
      statusCode: result.statusCode,
      headers: {
        "Content-Type": "application/json",
      },
      body: result.body,
    };
  } catch (error: any) {
    console.error("Error in API handler:", error);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ error: error.message || "Internal server error" }),
    };
  }
}
