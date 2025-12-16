import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

const dynamoClient = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(dynamoClient);
const s3Client = new S3Client({});

export async function handler(event: any) {
  try {
    const tableName = process.env.MEDIA_ASSETS_TABLE;
    const bucketName = process.env.MEDIA_STORAGE_BUCKET;

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

    const mediaId = event.pathParameters?.id;
    if (!mediaId) {
      return {
        statusCode: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type,Authorization",
          "Access-Control-Allow-Methods": "DELETE,OPTIONS",
        },
        body: JSON.stringify({ error: "Media ID is required" }),
      };
    }

    // Get media to find S3 key
    const getCommand = new GetCommand({
      TableName: tableName,
      Key: { id: mediaId },
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
      } catch (s3Error: any) {
        console.error("Error deleting from S3:", s3Error);
        // Continue with DynamoDB deletion even if S3 deletion fails
      }
    }

    // Delete from DynamoDB
    await docClient.send(
      new DeleteCommand({
        TableName: tableName,
        Key: { id: mediaId },
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
      body: JSON.stringify({ message: "Media deleted successfully" }),
    };
  } catch (error: any) {
    console.error("Error deleting media:", error);
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
