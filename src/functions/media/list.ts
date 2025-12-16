import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export async function handler(_event: any) {
  try {
    const tableName = process.env.MEDIA_ASSETS_TABLE;
    if (!tableName) {
      return {
        statusCode: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type,Authorization",
          "Access-Control-Allow-Methods": "GET,OPTIONS",
        },
        body: JSON.stringify({ error: "Table name not configured" }),
      };
    }

    const command = new ScanCommand({
      TableName: tableName,
    });

    const result = await docClient.send(command);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type,Authorization",
        "Access-Control-Allow-Methods": "GET,OPTIONS",
      },
      body: JSON.stringify({
        media: result.Items || [],
      }),
    };
  } catch (error: any) {
    console.error("Error listing media:", error);
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

