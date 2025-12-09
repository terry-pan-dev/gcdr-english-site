# Archive

This folder contains archived files that are no longer used in the active codebase but are kept for reference.

## Content

### `content/posts/`
MDX blog post files that were previously stored locally. These have been migrated to remote storage (S3/DynamoDB) and are now managed through the admin panel.

**Files archived:**
- `basic-teachings-of-buddha.mdx`
- `buddhism-buddhadharma.mdx`
- `four-noble-truths.mdx`
- `introduction-to-buddhism.mdx`
- `markdown-features-demo.mdx`
- `noble-eightfold-path.mdx`
- `the-five-precepts.mdx`
- `the-triple-jewel.mdx`
- `the-wheel-of-life.mdx`

### `content.config.ts`
Astro content collection configuration file. No longer needed since we're using remote blog storage instead of local MDX files.

## Migration Notes

- **Date:** December 2024
- **Reason:** Migrated from local MDX files to remote S3/DynamoDB storage
- **Impact:** All blog content is now managed through the admin panel at `/admin/dashboard`
- **Rendering:** Blog routes now use SSR to fetch from remote API, while static pages use SSG

