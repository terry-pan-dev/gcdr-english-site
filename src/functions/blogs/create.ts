import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

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
          "Access-Control-Allow-Methods": "POST,OPTIONS",
        },
        body: JSON.stringify({ error: "Configuration missing" }),
      };
    }

    const body = JSON.parse(event.body || "{}");
    const {
      title,
      subtitle,
      author,
      date,
      category,
      excerpt,
      image,
      featured = false,
      pinned = false,
      tags = [],
      publish = false,
      seo,
      content,
    } = body;

    if (!title || !author || !category || !excerpt || !content) {
      return {
        statusCode: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type,Authorization",
          "Access-Control-Allow-Methods": "POST,OPTIONS",
        },
        body: JSON.stringify({ error: "Missing required fields" }),
      };
    }

    const blogId = uuidv4();
    const s3Key = `blogs/${blogId}.mdx`;
    const now = new Date().toISOString();

    // Save content to S3
    await s3Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: s3Key,
        Body: content,
        ContentType: "text/markdown",
      })
    );

    // Save metadata to DynamoDB
    const blogItem = {
      id: blogId,
      title,
      subtitle: subtitle || "",
      author,
      date: date || now,
      category,
      excerpt,
      image: image || "",
      featured,
      pinned,
      tags,
      publish,
      seo: seo || {},
      s3Key,
      createdAt: now,
      updatedAt: now,
    };

    await docClient.send(
      new PutCommand({
        TableName: tableName,
        Item: blogItem,
      })
    );

    return {
      statusCode: 201,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type,Authorization",
        "Access-Control-Allow-Methods": "POST,OPTIONS",
      },
      body: JSON.stringify(blogItem),
    };
  } catch (error: any) {
    console.error("Error creating blog:", error);
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
