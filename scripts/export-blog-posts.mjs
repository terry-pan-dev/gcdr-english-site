#!/usr/bin/env node

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const args = process.argv.slice(2);

function readArg(name, fallback = "") {
  const prefix = `--${name}=`;
  const match = args.find((arg) => arg.startsWith(prefix));
  if (match) return match.slice(prefix.length);

  const index = args.indexOf(`--${name}`);
  if (index >= 0 && args[index + 1]) return args[index + 1];

  return fallback;
}

const useAdmin = args.includes("--admin") || process.env.BLOG_EXPORT_MODE === "admin";
const baseUrlArg = readArg("base-url", process.env.PUBLIC_API_BASE_URL || "");
const siteUrlArg = readArg("site-url", process.env.SITE_URL || "");
const token = readArg("token", process.env.BLOG_EXPORT_TOKEN || "");
const outputDir = readArg("out", "blog-migration/originals");

function normalizeBaseUrl(url) {
  return url.replace(/\/+$/, "");
}

function sanitizeFilename(value) {
  return String(value || "untitled")
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

function yamlScalar(value) {
  if (value === undefined || value === null) return '""';
  if (typeof value === "boolean" || typeof value === "number") return String(value);
  return JSON.stringify(String(value));
}

function yamlValue(value, indent = 0) {
  const pad = " ".repeat(indent);

  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    return `\n${value.map((item) => `${pad}- ${yamlScalar(item)}`).join("\n")}`;
  }

  if (value && typeof value === "object") {
    const entries = Object.entries(value).filter(([, child]) => child !== undefined);
    if (entries.length === 0) return "{}";
    return `\n${entries
      .map(([key, child]) => `${pad}${key}: ${yamlValue(child, indent + 2)}`)
      .join("\n")}`;
  }

  return yamlScalar(value);
}

function buildFrontmatter(post, exportedAt, sourceEndpoint) {
  const metadata = {
    id: post.id,
    title: post.title || "",
    subtitle: post.subtitle || "",
    date: post.date || "",
    author: post.author || "",
    category: post.category || "",
    excerpt: post.excerpt || "",
    image: post.image || "",
    featured: Boolean(post.featured),
    pinned: Boolean(post.pinned),
    publish: Boolean(post.publish),
    tags: post.tags || [],
    seo: post.seo || {},
    source: {
      oldUrl: `/post/${post.id}`,
      apiEndpoint: sourceEndpoint,
      s3Key: post.s3Key || "",
      createdAt: post.createdAt || "",
      updatedAt: post.updatedAt || "",
      exportedAt,
      exportMode: useAdmin ? "admin" : "public",
    },
  };

  const body = Object.entries(metadata)
    .map(([key, value]) => `${key}: ${yamlValue(value, 2)}`)
    .join("\n");

  return `---\n${body}\n---`;
}

async function fetchJson(url, options = {}) {
  const response = await fetch(url, options);
  const text = await response.text();

  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    throw new Error(`Expected JSON from ${url}, got: ${text.slice(0, 160)}`);
  }

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} from ${url}: ${data.error || text}`);
  }

  return data;
}

async function resolveBaseUrl() {
  if (baseUrlArg) return normalizeBaseUrl(baseUrlArg);

  if (siteUrlArg) {
    const configUrl = `${normalizeBaseUrl(siteUrlArg)}/api/config.json`;
    const config = await fetchJson(configUrl);
    if (config.baseUrl) return normalizeBaseUrl(config.baseUrl);
  }

  throw new Error(
    "Missing API base URL. Pass --base-url=https://... or --site-url=https://your-site.example."
  );
}

async function main() {
  if (useAdmin && !token) {
    throw new Error(
      "Admin export requires a Cognito access token. Pass --token=... or set BLOG_EXPORT_TOKEN."
    );
  }

  const baseUrl = await resolveBaseUrl();
  const exportedAt = new Date().toISOString();
  const apiRoot = useAdmin ? "/api/admin/blogs" : "/api/public/blogs";
  const listUrl = `${baseUrl}${apiRoot}`;
  const headers = useAdmin ? { Authorization: `Bearer ${token}` } : {};

  const listData = await fetchJson(listUrl, { headers });
  const list = Array.isArray(listData.blogs) ? listData.blogs : [];

  await mkdir(outputDir, { recursive: true });

  const inventory = [];

  for (const listItem of list) {
    const id = listItem.id;
    if (!id) continue;

    const postUrl = `${baseUrl}${apiRoot}/${encodeURIComponent(id)}`;
    const post = await fetchJson(postUrl, { headers });
    const slug = sanitizeFilename(post.id || post.title || id);
    const filenameBase = `${post.date ? String(post.date).slice(0, 10) + "-" : ""}${slug}`;
    const mdxPath = path.join(outputDir, `${filenameBase}.mdx`);
    const jsonPath = path.join(outputDir, `${filenameBase}.json`);

    const content = post.content || "";
    const frontmatter = buildFrontmatter(post, exportedAt, postUrl);

    await writeFile(mdxPath, `${frontmatter}\n\n${content.trim()}\n`, "utf8");
    await writeFile(jsonPath, `${JSON.stringify(post, null, 2)}\n`, "utf8");

    inventory.push({
      id,
      title: post.title || "",
      date: post.date || "",
      category: post.category || "",
      tags: post.tags || [],
      publish: Boolean(post.publish),
      oldUrl: `/post/${id}`,
      sourceEndpoint: postUrl,
      mdxPath,
      jsonPath,
      contentLength: content.length,
    });
  }

  inventory.sort((a, b) => String(b.date).localeCompare(String(a.date)));
  await writeFile(
    path.join(outputDir, "_inventory.json"),
    `${JSON.stringify({ exportedAt, exportMode: useAdmin ? "admin" : "public", count: inventory.length, posts: inventory }, null, 2)}\n`,
    "utf8"
  );

  const markdownInventory = [
    "# Blog Export Inventory",
    "",
    `Exported at: ${exportedAt}`,
    `Mode: ${useAdmin ? "admin" : "public"}`,
    `Count: ${inventory.length}`,
    "",
    "| Date | Title | Category | Old URL | File |",
    "| --- | --- | --- | --- | --- |",
    ...inventory.map(
      (post) =>
        `| ${post.date || ""} | ${String(post.title).replaceAll("|", "\\|")} | ${String(post.category).replaceAll("|", "\\|")} | ${post.oldUrl} | ${post.mdxPath} |`
    ),
    "",
  ].join("\n");

  await writeFile(path.join(outputDir, "_inventory.md"), markdownInventory, "utf8");

  console.log(`Exported ${inventory.length} blog posts to ${outputDir}`);
  console.log(`Mode: ${useAdmin ? "admin" : "public"}`);
  console.log(`API: ${baseUrl}`);
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
