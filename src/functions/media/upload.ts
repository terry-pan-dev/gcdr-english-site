import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";

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
          "Access-Control-Allow-Methods": "POST,OPTIONS",
        },
        body: JSON.stringify({ error: "Configuration missing" }),
      };
    }

    const body = JSON.parse(event.body || "{}");
    const { filename, type, size } = body;

    if (!filename || !type) {
      return {
        statusCode: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type,Authorization",
          "Access-Control-Allow-Methods": "POST,OPTIONS",
        },
        body: JSON.stringify({ error: "Filename and type are required" }),
      };
    }

    const mediaId = uuidv4();
    const fileExtension = filename.split(".").pop() || "";
    const s3Key = `media/${type}/${mediaId}-${filename}`;
    const contentType = type === "image" 
      ? `image/${fileExtension === "jpg" ? "jpeg" : fileExtension}`
      : `video/${fileExtension}`;

    // Generate presigned URL for upload
    const putCommand = new PutObjectCommand({
      Bucket: bucketName,
      Key: s3Key,
      ContentType: contentType,
    });

    const uploadUrl = await getSignedUrl(s3Client, putCommand, { expiresIn: 3600 });

    // Generate public URL (bucket is public)
    // Note: In production, you might want to use CloudFront or a custom domain
    const region = process.env.AWS_REGION || "ap-southeast-2";
    const publicUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${s3Key}`;

    // Save metadata to DynamoDB
    const mediaItem = {
      id: mediaId,
      filename,
      s3Key,
      url: publicUrl,
      type,
      size: size || 0,
      uploadedAt: new Date().toISOString(),
    };

    await docClient.send(
      new PutCommand({
        TableName: tableName,
        Item: mediaItem,
      })
    );

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type,Authorization",
        "Access-Control-Allow-Methods": "POST,OPTIONS",
      },
      body: JSON.stringify({
        uploadUrl,
        media: mediaItem,
      }),
    };
  } catch (error: any) {
    console.error("Error generating upload URL:", error);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type,Authorization",
        "Access-Control-Allow-Methods": "POST,OPTIONS",
      },
      body: JSON.stringify({ error: error.message || "Internal server error" }),
    };
  }
}

