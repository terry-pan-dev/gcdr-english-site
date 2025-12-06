# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## CRITICAL: Package Manager

**This project exclusively uses pnpm. Never use npm or yarn.**

```bash
# ✅ Correct
pnpm install
pnpm add package-name
pnpm add -D package-name
pnpm run dev
pnpm run build

# ❌ Never use
npm install
npm add
yarn add
```

**Evidence:** `pnpm-lock.yaml` exists in project root.

---

## Project Overview

**GCDR** - A spiritual/religious organization website, originally designed in Figma.

**Current State:** React + Vite (hash-based routing)
**Future State:** Astro + SST deployment to AWS

### Current Technology Stack

- React 18.3 with TypeScript
- Vite 6.3.5 (build tool, dev server)
- Tailwind CSS v4
- Radix UI + shadcn/ui components
- Animation: Motion or GSAP (choose based on need)
- Package Manager: **pnpm only**

### Current Development Commands

```bash
pnpm install          # Install dependencies
pnpm run dev          # Dev server (http://localhost:3000)
pnpm run build        # Build (output: build/)
```

---

## Current Architecture (React/Vite)

### Hash-Based Routing

Implemented in `App.tsx` using `hashchange` event listener:

```
/ (home)             → Hero, About, Teachings, Posters, Visit sections
#events              → Events page
#master-about        → Master biography
#18-vows             → Eighteen Vows
#six-principles      → Six Principles
#white-universe-poem → White Universe poem
#about               → About page
```

**Adding new pages:**
1. Add hash case in `App.tsx` useEffect
2. Add conditional render in `App.tsx` return
3. Update `Navigation.tsx` links

### Project Structure

```
src/
├── App.tsx              # Routing logic
├── main.tsx             # React entry
├── index.css            # Tailwind CSS (auto-generated)
├── components/
│   ├── Navigation.tsx, Footer.tsx
│   ├── Hero.tsx, About.tsx, AboutPage.tsx
│   ├── Teachings.tsx, Posters.tsx, Visit.tsx
│   ├── Events.tsx, MasterBio.tsx
│   ├── EighteenVows.tsx, SixPrinciples.tsx, WhiteUniverse.tsx
│   ├── ImageCarousel.tsx
│   ├── ui/          # shadcn/ui components
│   └── figma/       # Figma utilities
```

### Styling

- **Tailwind CSS v4** for all styling
- `cn()` utility in `src/components/ui/utils.ts` (clsx + tailwind-merge)
- Theme: Stone palette (light), `#1c1917` (dark)
- Responsive: Mobile-first with `sm:`, `md:`, `lg:`, `xl:` prefixes

### Figma Assets

Special Vite aliases in `vite.config.ts`:
```typescript
'figma:asset/[hash].png': path.resolve(__dirname, './src/assets/[hash].png')
```

Usage:
```typescript
import logo from "figma:asset/613127d6253458124fba09d80d9e1a3ee9a328d8.png";
```

### Path Aliases

`@` → `src/` directory:
```typescript
import { cn } from "@/components/ui/utils"
```

### Key Notes

- No test framework or linting (ESLint/Prettier)
- TypeScript strict mode: disabled
- Hero video loads from gcdrchinese.com
- All React components reusable in Astro migration

---

## Claude Code Skills

**This project has custom Claude Code skills available for specialized tasks.**

### frontend-design

**Purpose:** UI/UX design consultant for creating distinctive, production-grade frontend interfaces.

**When to use:**
- Building web components, pages, or applications
- Creating landing pages, dashboards, or layouts
- Styling or beautifying web UI
- Need creative, polished design that avoids generic aesthetics
- Want distinctive typography, color schemes, and visual details
- Building websites, posters, or artifacts with high design quality

**How to invoke:**
```
Use the frontend-design skill
```

**What it provides:**
- Bold aesthetic direction (minimalist, maximalist, brutalist, retro-futuristic, etc.)
- Distinctive typography choices (avoids generic fonts like Inter, Roboto, Arial)
- Cohesive color themes with CSS variables
- Animations and micro-interactions (CSS or Motion library)
- Unexpected layouts with asymmetry, overlap, and grid-breaking elements
- Creative backgrounds, textures, gradients, and visual effects
- Production-grade, functional code with exceptional aesthetic attention

**Important notes:**
- Creates context-specific designs (no generic AI aesthetics)
- Matches implementation complexity to aesthetic vision
- Uses animations for high-impact moments
- Varies between light/dark themes, different fonts, and aesthetics
- Prioritizes bold, intentional design choices

**Example use cases:**
- "Use frontend-design skill to create a hero section for the Events page"
- "Use frontend-design skill to design a distinctive navigation menu"
- "Use frontend-design skill to create a landing page with brutalist aesthetic"

---

## Animation Libraries

**Choose either Motion or GSAP based on the specific need. Both can coexist.**

### Motion (Recommended for React Components)

Lightweight, declarative API, optimized for React.

**Install:** `pnpm add motion`
**Context7:** `/websites/motion-dev-docs`

**When to use:**
- React/Astro components
- Gesture animations (hover, tap, drag)
- Scroll-triggered with `whileInView`
- Layout animations
- Smaller bundle (15-25kb)

**Quick examples:**
```jsx
import { motion } from "motion/react";

// Basic
<motion.div animate={{ opacity: 1, x: 100 }} />

// Gestures
<motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} />

// Scroll-triggered
<motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} />

// Exit animations
import { AnimatePresence } from "motion/react";
<AnimatePresence>
  {show && <motion.div exit={{ opacity: 0 }} />}
</AnimatePresence>
```

**Key props:** `initial`, `animate`, `exit`, `whileHover`, `whileTap`, `whileDrag`, `whileInView`, `transition`

### GSAP (For Complex Animations)

Professional-grade, timeline-based, framework-agnostic.

**Install:** `pnpm add gsap`
**Context7:** `/websites/gsap_v3`

**When to use:**
- Complex timeline sequences
- Advanced scroll effects (pinning, scrubbing)
- SVG morphing
- Fine-grained playback control
- Non-React animations

**Quick examples:**
```javascript
import { gsap } from "gsap";

// Basic
gsap.to(".element", { x: 100, duration: 1 });

// Timeline
const tl = gsap.timeline();
tl.to(".box1", { x: 100 })
  .to(".box2", { y: 100 })
  .to(".box3", { rotation: 360 }, "<"); // "<" = start with previous

// ScrollTrigger
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

gsap.to(".box", {
  x: 500,
  scrollTrigger: {
    trigger: ".box",
    start: "top center",
    scrub: true,
    pin: true
  }
});
```

**React integration:**
```javascript
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

function Component() {
  const el = useRef();
  useEffect(() => {
    gsap.to(el.current, { x: 100, duration: 1 });
  }, []);
  return <div ref={el}>Animated</div>;
}
```

### Using in Astro

Both work in Astro with React components (use `client:load` directive).

GSAP also works in `.astro` files:
```astro
<script>
  import { gsap } from "gsap";
  gsap.to(".box", { x: 100, duration: 1 });
</script>
```

---

## Migration to Astro + SST

**Status:** Planned migration from React/Vite to Astro framework with SST deployment to AWS.

**For uncertainties, use context7:**
- Astro: `/withastro/docs`
- SST: `/websites/sst_dev`

### Why Migrate?

- **Better performance:** Server-first, minimal JS
- **SEO benefits:** True SSR vs client-side routing
- **Modern routing:** File-based routing (no hash URLs)
- **AWS deployment:** SST for production-grade infrastructure

### Astro Overview

Modern web framework for content-focused websites:
- **Server-first** - Minimal JavaScript by default
- **File-based routing** - `src/pages/*.astro` → routes
- **Islands Architecture** - Interactive components load independently
- **UI agnostic** - Use React, Vue, Svelte, or vanilla
- **Zero JS default** - Opt-in with client directives

### Astro Project Structure

```
project/
├── src/
│   ├── pages/           # Auto-routes (REQUIRED)
│   │   ├── index.astro  # → /
│   │   ├── events.astro # → /events
│   │   └── [slug].astro # → /:slug (dynamic)
│   ├── layouts/         # Layout components
│   ├── components/      # Reusable (keep .tsx files)
│   ├── styles/          # CSS/SCSS
│   └── assets/          # Images, fonts
├── public/              # Static assets (copied as-is)
├── astro.config.mjs     # Astro config
└── sst.config.ts        # SST infrastructure (when using SST)
```

### Key Differences: React/Vite → Astro

| Current (React/Vite) | Astro |
|----------------------|-------|
| Hash routing (`#events`) | File routing (`/events`) |
| `App.tsx` routing logic | `src/pages/*.astro` files |
| Client-side routing | Server-rendered |
| `pnpm run dev` on :3000 | `pnpm run dev` on :4321 |
| Output: `build/` | Output: `dist/` |
| All JS loaded | JS opt-in with `client:*` |

### React in Astro

**Install:**
```bash
pnpm add @astrojs/react react react-dom
```

**Configure `astro.config.mjs`:**
```javascript
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [react(), tailwind()],
});
```

**Use React components with client directives:**
```astro
---
import Navigation from '../components/Navigation.tsx';
---

<Navigation client:load />  {/* Interactive */}
<Footer />                   {/* Static HTML only */}
```

**Client directives:**
- `client:load` - Load immediately
- `client:idle` - Load when idle
- `client:visible` - Load when visible
- `client:media="(min-width: 768px)"` - Media query
- `client:only="react"` - Client-side only (no SSR)

### Migration Strategy

**1. Convert routes:** Hash → File-based
```
#events              → src/pages/events.astro
#master-about        → src/pages/master-about.astro
#18-vows             → src/pages/18-vows.astro
/ (home)             → src/pages/index.astro
```

**2. Wrap React components:**
```astro
---
import Navigation from '../components/Navigation.tsx';
import Events from '../components/Events.tsx';
---

<div class="min-h-screen bg-stone-50">
  <Navigation client:load />
  <Events client:load />
</div>
```

**3. Keep existing:**
- All `.tsx` React components
- Tailwind CSS (install `@astrojs/tailwind`)
- Figma assets pattern
- UI components

**4. Update navigation:**
Replace hash links with standard `<a>` tags:
```astro
<a href="/">Home</a>
<a href="/events">Events</a>
```

### Astro Commands

```bash
pnpm create astro@latest  # Create new project
pnpm install              # Install deps
pnpm run dev              # Dev server (:4321)
pnpm run build            # Build (output: dist/)
pnpm run preview          # Preview build
```

---

## SST Deployment to AWS

**SST** = Serverless Stack framework for AWS deployment.

**Context7 for details:** `/websites/sst_dev`

### What is SST?

- **Infrastructure as Code** in TypeScript
- **Type-safe** across infrastructure and app
- **AWS native** - deploys to your account
- **Resource linking** - automatic credential management
- **Live dev** - `sst dev` connects local to AWS
- **Multi-region** support

### Setup SST with Astro

**1. Initialize:**
```bash
pnpm add astro-sst  # SST adapter
npx sst@latest init # Creates sst.config.ts
```

**2. Configure Astro for SST:**
```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import aws from 'astro-sst';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  output: "server",      // Required for SST
  adapter: aws(),
  integrations: [react(), tailwind()],
});
```

**3. Configure SST:**
```typescript
// sst.config.ts
export default $config({
  app(input) {
    return {
      name: "gcdr-website",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    new sst.aws.Astro("GCDR", {
      domain: "your-domain.com" // Optional
    });
  },
});
```

### SST Project Structure

```
project/
├── sst.config.ts        # Infrastructure definition
├── infra/               # Optional: Split infra into modules
│   ├── storage.ts       # S3, DynamoDB
│   └── web.ts           # Astro app
├── src/                 # Astro app
└── astro.config.mjs
```

### Resource Linking

Automatically connect to AWS resources without manual credential management.

**Example: S3 + DynamoDB:**
```typescript
// sst.config.ts
async run() {
  const bucket = new sst.aws.Bucket("MyBucket", { access: "public" });
  const table = new sst.aws.Dynamo("MyTable", {
    fields: { userId: "string", noteId: "string" },
    primaryIndex: { hashKey: "userId", rangeKey: "noteId" }
  });

  new sst.aws.Astro("MyWeb", {
    link: [bucket, table]
  });
}
```

**Access in Astro:**
```typescript
import { Resource } from "sst";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";

// S3
const s3 = new S3Client();
await s3.send(new PutObjectCommand({
  Bucket: Resource.MyBucket.name,
  Key: "file.jpg",
  Body: buffer
}));

// DynamoDB
const dynamo = new DynamoDBClient();
await dynamo.send(new QueryCommand({
  TableName: Resource.MyTable.name,
  KeyConditionExpression: "userId = :userId",
  ExpressionAttributeValues: { ":userId": { S: "user-123" } }
}));
```

### SST Commands

```bash
sst dev              # Local dev with AWS resources
sst dev astro dev    # Run Astro inside SST
sst deploy           # Deploy to AWS
sst deploy --stage production
sst remove           # Remove resources
sst shell            # Shell with AWS access
```

### Stages (Environments)

SST uses stages for dev/staging/production:

```typescript
async run() {
  const domain = $app.stage === "production"
    ? "gcdr.com"
    : `${$app.stage}.gcdr.com`;

  new sst.aws.Astro("MyWeb", { domain });
}
```

Deploy:
```bash
sst deploy --stage dev
sst deploy --stage staging
sst deploy --stage production
```

### AWS Setup

**Prerequisites:**
1. AWS account
2. Configured credentials: `aws configure`

### Infrastructure Organization

For larger projects, split into modules:

```typescript
// infra/storage.ts
export const bucket = new sst.aws.Bucket("MyBucket");
export const table = new sst.aws.Dynamo("MyTable", {
  fields: { id: "string" },
  primaryIndex: { hashKey: "id" }
});

// infra/web.ts
import { bucket, table } from "./storage";
export const web = new sst.aws.Astro("MyWeb", {
  link: [bucket, table]
});

// sst.config.ts
import "./infra/storage";
import "./infra/web";
export default $config({ /* ... */ });
```

### SST Console (Optional)

Web console for monitoring:
- **console.sst.dev**
- Real-time logs and resources
- Autodeploy from GitHub (via CodeBuild)
- Branch and PR environments

---

## Context7 Reference Guide

When uncertain about specific topics, use context7 to search official documentation:

### Astro
**Library ID:** `/withastro/docs`

**Search topics:**
- "content collections" - Structured content
- "view transitions" - Page transitions
- "middleware" - Auth, redirects
- "server endpoints" - API routes
- "image optimization" - `<Image>` component
- "react integration" - Using React in Astro

### SST
**Library ID:** `/websites/sst_dev`

**Search topics:**
- "astro deployment" - Astro config
- "custom domain" - Domain setup
- "linking resources" - S3, DynamoDB connection
- "environment variables" - Env var management
- "multi-region" - Multi-region deployment
- "console autodeploy" - CI/CD setup

### Motion
**Library ID:** `/websites/motion-dev-docs`

**Search topics:**
- "whileInView" - Scroll animations
- "useScroll" - Scroll progress
- "AnimatePresence" - Exit animations
- "layout animations" - Position/size changes
- "gestures" - Hover, tap, drag

### GSAP
**Library ID:** `/websites/gsap_v3`

**Search topics:**
- "timeline" - Animation sequences
- "scrolltrigger" - Scroll animations
- "react" - React integration
- "selector utility" - Scoped selections
- "plugins" - ScrollTo, MorphSVG

---

## Quick Reference

### Current Commands (React/Vite)
```bash
pnpm install
pnpm run dev    # :3000
pnpm run build  # → build/
```

### Future Commands (Astro)
```bash
pnpm install
pnpm run dev    # :4321
pnpm run build  # → dist/
```

### Future Commands (Astro + SST)
```bash
pnpm install
sst dev astro dev
sst deploy --stage production
```

### Routes Migration
```
#events              → /events
#master-about        → /master-about
#18-vows             → /18-vows
#six-principles      → /six-principles
#white-universe-poem → /white-universe-poem
#about               → /about
/ (home)             → / (index.astro with sections)
```

### Important Reminders

✅ **Always use pnpm** (never npm/yarn)
✅ **React components reusable** in Astro
✅ **Add client directives** for interactivity in Astro
✅ **Tailwind works** in Astro with integration
✅ **Motion/GSAP both work** - choose based on need
✅ **Use context7** when uncertain about features
✅ **Use frontend-design skill** for UI/UX design consultation
