import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

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
          "Access-Control-Allow-Methods": "DELETE,OPTIONS",
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
          "Access-Control-Allow-Methods": "DELETE,OPTIONS",
        },
        body: JSON.stringify({ error: "Blog ID is required" }),
      };
    }

    // Get blog to find S3 key
    const getCommand = new GetCommand({
      TableName: tableName,
      Key: { id: blogId },
    });

    const existing = await docClient.send(getCommand);
    if (!existing.Item) {
      return {
        statusCode: 404,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type,Authorization",
          "Access-Control-Allow-Methods": "DELETE,OPTIONS",
        },
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
      } catch (s3Error: any) {
        console.error("Error deleting from S3:", s3Error);
        // Continue with DynamoDB deletion even if S3 deletion fails
      }
    }

    // Delete from DynamoDB
    await docClient.send(
      new DeleteCommand({
        TableName: tableName,
        Key: { id: blogId },
      })
    );

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type,Authorization",
        "Access-Control-Allow-Methods": "DELETE,OPTIONS",
      },
      body: JSON.stringify({ message: "Blog deleted successfully" }),
    };
  } catch (error: any) {
    console.error("Error deleting blog:", error);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type,Authorization",
        "Access-Control-Allow-Methods": "DELETE,OPTIONS",
      },
      body: JSON.stringify({ error: error.message || "Internal server error" }),
    };
  }
}

