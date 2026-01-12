# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## CRITICAL: Package Manager

**This project exclusively uses pnpm. Never use npm or yarn.**

```bash
pnpm install          # Install dependencies
pnpm add package-name # Add dependency
pnpm add -D package   # Add dev dependency
```

---

## Development Commands

```bash
pnpm run dev          # Dev server (http://localhost:4321)
pnpm run build        # Production build (output: dist/)
pnpm run preview      # Preview production build
pnpm run lint         # Run ESLint
pnpm run lint:fix     # Fix ESLint issues
pnpm run format       # Format with Prettier
pnpm run format:check # Check formatting
pnpm run test         # Run tests (Vitest)
pnpm run test:watch   # Run tests in watch mode
pnpm run test:ui      # Run tests with UI
pnpm run typecheck    # TypeScript + Astro check
pnpm run ci           # Full CI pipeline (lint + format + typecheck + test + build)
```

### Deployment (SST to AWS)

```bash
sst dev               # Local dev with live AWS resources
sst deploy --stage dev
sst deploy --stage production
```

---

## Technology Stack

- **Framework:** Astro 5.x with React 18.3 (Islands Architecture)
- **Styling:** Tailwind CSS v4
- **Components:** Radix UI + shadcn/ui
- **Animation:** Motion or GSAP (choose per use case)
- **Deployment:** SST to AWS (CloudFront + Lambda + S3)
- **Backend:** DynamoDB, S3, Cognito (admin auth)
- **Testing:** Vitest + Testing Library

---

## Project Architecture

### File-Based Routing

Astro pages in `src/pages/` auto-route:

```
src/pages/index.astro        → /
src/pages/events.astro       → /events
src/pages/blog.astro         → /blog
src/pages/post/[slug].astro  → /post/:slug (dynamic)
src/pages/admin/dashboard.astro → /admin/dashboard
```

### Project Structure

```
src/
├── pages/           # Astro routes (auto-routing)
├── layouts/         # BaseLayout, AdminLayout, BlogLayout
├── components/      # React components (.tsx)
│   └── ui/          # shadcn/ui components
├── functions/       # Lambda handlers
│   ├── api/handler.ts  # Main API (blogs, media CRUD)
│   ├── blogs/       # Blog operation modules
│   └── media/       # Media operation modules
├── lib/             # Utilities
│   ├── admin-api.ts    # Client-side admin API calls
│   ├── server-blog-api.ts  # Server-side blog fetching
│   ├── amplify-config.ts   # Cognito configuration
│   └── env.ts       # Environment variable access
├── assets/          # Images, fonts (processed by Astro)
└── styles/          # Global styles

sst.config.ts        # AWS infrastructure definition
astro.config.mjs     # Astro configuration
```

### SST Infrastructure (sst.config.ts)

Resources created:
- **DynamoDB:** BlogPosts, MediaAssets tables
- **S3:** BlogStorage (private), MediaStorage (public)
- **Cognito:** AdminUserPool + client (manual user creation)
- **Lambda:** AdminAPI function (all endpoints)
- **Astro:** Static site deployed to CloudFront

### API Endpoints

Defined in `src/functions/api/handler.ts`:

```
# Public (no auth)
GET  /api/public/blogs        # List published blogs
GET  /api/public/blogs/:id    # Get single published blog

# Admin (Cognito JWT required)
GET/POST         /api/admin/blogs
GET/PUT/DELETE   /api/admin/blogs/:id
GET/POST         /api/admin/media
DELETE           /api/admin/media/:id
```

---

## React Components in Astro

Interactive components need client directives:

```astro
---
import Navigation from '../components/Navigation.tsx';
import Footer from '../components/Footer.tsx';
---

<Navigation client:load />   <!-- Interactive: loads immediately -->
<Footer />                    <!-- Static: server-rendered only -->
```

**Client directives:**
- `client:load` - Load immediately
- `client:idle` - Load when browser is idle
- `client:visible` - Load when visible in viewport
- `client:only="react"` - Client-only (no SSR)

---

## Styling

- **Tailwind CSS v4** with stone palette theme
- `cn()` utility in `src/components/ui/utils.ts` (clsx + tailwind-merge)
- Path alias: `@` → `src/` directory

---

## Animation Libraries

Choose based on need - both installed:

### Motion (Recommended for React)
```jsx
import { motion } from "motion/react";
<motion.div animate={{ opacity: 1 }} whileHover={{ scale: 1.1 }} />
```

### GSAP (For complex timelines/scroll effects)
```javascript
import { gsap } from "gsap";
gsap.to(".element", { x: 100, duration: 1 });
```

---

## Claude Code Skills

### frontend-design

UI/UX design consultant for creating distinctive, production-grade interfaces.

**When to use:**
- Building web components, pages, or applications
- Creating landing pages, dashboards, layouts
- Styling or beautifying web UI
- Need creative design that avoids generic aesthetics

**How to invoke:**
```
Use the frontend-design skill
```

---

## Context7 Reference

For library documentation, use context7:

| Library | ID |
|---------|-----|
| Astro | `/withastro/docs` |
| SST | `/websites/sst_dev` |
| Motion | `/websites/motion-dev-docs` |
| GSAP | `/websites/gsap_v3` |
