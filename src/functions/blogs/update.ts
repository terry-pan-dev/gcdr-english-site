import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

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
          "Access-Control-Allow-Methods": "PUT,OPTIONS",
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
          "Access-Control-Allow-Methods": "PUT,OPTIONS",
        },
        body: JSON.stringify({ error: "Blog ID is required" }),
      };
    }

    // Get existing blog
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
          "Access-Control-Allow-Methods": "PUT,OPTIONS",
        },
        body: JSON.stringify({ error: "Blog not found" }),
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
      featured,
      pinned,
      tags,
      publish,
      seo,
      content,
    } = body;

    // Update content in S3 if provided
    const s3Key = existing.Item.s3Key || `blogs/${blogId}.mdx`;
    if (content !== undefined) {
      await s3Client.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: s3Key,
          Body: content,
          ContentType: "text/markdown",
        })
      );
    }

    // Update metadata in DynamoDB
    const updatedItem = {
      ...existing.Item,
      ...(title !== undefined && { title }),
      ...(subtitle !== undefined && { subtitle }),
      ...(author !== undefined && { author }),
      ...(date !== undefined && { date }),
      ...(category !== undefined && { category }),
      ...(excerpt !== undefined && { excerpt }),
      ...(image !== undefined && { image }),
      ...(featured !== undefined && { featured }),
      ...(pinned !== undefined && { pinned }),
      ...(tags !== undefined && { tags }),
      ...(publish !== undefined && { publish }),
      ...(seo !== undefined && { seo }),
      s3Key,
      updatedAt: new Date().toISOString(),
    };

    await docClient.send(
      new PutCommand({
        TableName: tableName,
        Item: updatedItem,
      })
    );

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type,Authorization",
        "Access-Control-Allow-Methods": "PUT,OPTIONS",
      },
      body: JSON.stringify(updatedItem),
    };
  } catch (error: any) {
    console.error("Error updating blog:", error);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type,Authorization",
        "Access-Control-Allow-Methods": "PUT,OPTIONS",
      },
      body: JSON.stringify({ error: error.message || "Internal server error" }),
    };
  }
}

