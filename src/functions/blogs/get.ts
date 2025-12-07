import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

const dynamoClient = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(dynamoClient);
const s3Client = new S3Client({});

export async function handler(event: any) {
  try {
    const tableName = process.env.BLOG_POSTS_TABLE;
    const bucketName = process.env.BLOG_STORAGE_BUCKET;
    
    if (!tableName || !bucketName) {
      return {
        statusCode: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type,Authorization",
          "Access-Control-Allow-Methods": "GET,OPTIONS",
        },
        body: JSON.stringify({ error: "Configuration missing" }),
      };
    }

    const blogId = event.pathParameters?.id;
    if (!blogId) {
      return {
        statusCode: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type,Authorization",
          "Access-Control-Allow-Methods": "GET,OPTIONS",
        },
        body: JSON.stringify({ error: "Blog ID is required" }),
      };
    }

    // Get blog metadata from DynamoDB
    const command = new GetCommand({
      TableName: tableName,
      Key: { id: blogId },
    });

    const result = await docClient.send(command);
    
    if (!result.Item) {
      return {
        statusCode: 404,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type,Authorization",
          "Access-Control-Allow-Methods": "GET,OPTIONS",
        },
        body: JSON.stringify({ error: "Blog not found" }),
      };
    }

    // Get blog content from S3
    const s3Key = result.Item.s3Key;
    if (s3Key) {
      try {
        const s3Command = new GetObjectCommand({
          Bucket: bucketName,
          Key: s3Key,
        });
        const s3Result = await s3Client.send(s3Command);
        const content = await s3Result.Body?.transformToString();
        result.Item.content = content || "";
      } catch (s3Error: any) {
        console.error("Error fetching from S3:", s3Error);
        result.Item.content = "";
      }
    } else {
      result.Item.content = "";
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type,Authorization",
        "Access-Control-Allow-Methods": "GET,OPTIONS",
      },
      body: JSON.stringify(result.Item),
    };
  } catch (error: any) {
    console.error("Error getting blog:", error);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type,Authorization",
        "Access-Control-Allow-Methods": "GET,OPTIONS",
      },
      body: JSON.stringify({ error: error.message || "Internal server error" }),
    };
  }
}

