// Server-side utility to fetch blogs from DynamoDB/S3
// This is used in Astro pages for SSR

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

const dynamoClient = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(dynamoClient);
const s3Client = new S3Client({});

export interface ServerBlogPost {
  id: string;
  title: string;
  subtitle?: string;
  author: string;
  date: string;
  category: string;
  excerpt: string;
  image?: string;
  featured: boolean;
  pinned: boolean;
  tags: string[];
  publish: boolean;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
  content?: string;
  createdAt: string;
  updatedAt: string;
}

export async function getS3Blogs(): Promise<ServerBlogPost[]> {
  try {
    const tableName = process.env.BLOG_POSTS_TABLE;
    const bucketName = process.env.BLOG_STORAGE_BUCKET;

    if (!tableName) {
      console.warn("BLOG_POSTS_TABLE not configured, skipping S3 blogs");
      return [];
    }

    const command = new ScanCommand({
      TableName: tableName,
    });

    const result = await docClient.send(command);
    const blogs = (result.Items || []) as ServerBlogPost[];

    // Filter only published blogs
    const now = new Date();
    const publishedBlogs = blogs.filter((blog) => {
      if (!blog.publish) return false;
      const postDate = new Date(blog.date);
      postDate.setHours(0, 0, 0, 0);
      const today = new Date(now);
      today.setHours(0, 0, 0, 0);
      return postDate <= today;
    });

    return publishedBlogs;
  } catch (error) {
    console.error("Error fetching S3 blogs:", error);
    return [];
  }
}

