#!/usr/bin/env node

/**
 * Script to replace hardcoded color values with theme classes in components
 * This helps optimize the generated index.css by using CSS variables instead of hardcoded values
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Color mappings: arbitrary value -> theme class
const colorReplacements = [
  // Text colors
  { pattern: /text-\[#1c1917\]/g, replacement: "text-dark-bg" },
  { pattern: /text-\[#EBE9CF\]/g, replacement: "text-dark-text" },
  { pattern: /text-\[#c9a050\]/g, replacement: "text-accent-gold" },

  // Background colors
  { pattern: /bg-\[#1c1917\]/g, replacement: "bg-dark-bg" },
  { pattern: /bg-\[#2a2522\]/g, replacement: "bg-dark-card" },
  { pattern: /bg-\[#c9a050\]/g, replacement: "bg-accent-gold" },

  // Border colors
  { pattern: /border-\[#c9a050\]/g, replacement: "border-accent-gold" },

  // Gradient colors (from/via/to)
  { pattern: /from-\[#1c1917\]/g, replacement: "from-dark-bg" },
  { pattern: /via-\[#1c1917\]/g, replacement: "via-dark-bg" },
  { pattern: /to-\[#1c1917\]/g, replacement: "to-dark-bg" },
  { pattern: /via-\[#c9a050\]/g, replacement: "via-accent-gold" },
];

// Opacity variants (keep opacity, change color)
const opacityReplacements = [
  { pattern: /text-\[#c9a050\]\/(\d+)/g, replacement: "text-accent-gold/$1" },
  { pattern: /bg-\[#1c1917\]\/(\d+)/g, replacement: "bg-dark-bg/$1" },
  { pattern: /bg-\[#2a2522\]\/(\d+)/g, replacement: "bg-dark-card/$1" },
  { pattern: /bg-\[#c9a050\]\/(\d+)/g, replacement: "bg-accent-gold/$1" },
  { pattern: /border-\[#c9a050\]\/(\d+)/g, replacement: "border-accent-gold/$1" },
  { pattern: /from-\[#1c1917\]\/(\d+)/g, replacement: "from-dark-bg/$1" },
  { pattern: /via-\[#1c1917\]\/(\d+)/g, replacement: "via-dark-bg/$1" },
  { pattern: /to-\[#1c1917\]\/(\d+)/g, replacement: "to-dark-bg/$1" },
];

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  let modified = false;

  // Apply all replacements
  [...colorReplacements, ...opacityReplacements].forEach(({ pattern, replacement }) => {
    if (pattern.test(content)) {
      content = content.replace(pattern, replacement);
      modified = true;
    }
  });

  if (modified) {
    fs.writeFileSync(filePath, content, "utf8");
    return true;
  }

  return false;
}

function findComponentFiles(dir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory() && entry.name !== "node_modules" && entry.name !== ".git") {
      files.push(...findComponentFiles(fullPath));
    } else if (entry.isFile() && (entry.name.endsWith(".tsx") || entry.name.endsWith(".jsx"))) {
      files.push(fullPath);
    }
  }

  return files;
}

function main() {
  const srcDir = path.join(process.cwd(), "src", "components");

  if (!fs.existsSync(srcDir)) {
    console.error("Error: src/components directory not found");
    process.exit(1);
  }

  console.log("🔍 Finding component files...");
  const files = findComponentFiles(srcDir);
  console.log(`Found ${files.length} component files\n`);

  let modifiedCount = 0;

  files.forEach((file) => {
    if (replaceInFile(file)) {
      console.log(`✅ Updated: ${path.relative(process.cwd(), file)}`);
      modifiedCount++;
    }
  });

  console.log(`\n✨ Done! Modified ${modifiedCount} files`);
  console.log("\n📝 Next steps:");
  console.log("1. Review the changes");
  console.log("2. Run: pnpm run build");
  console.log("3. Check that index.css now uses CSS variables instead of hardcoded values");
}

if (require.main === module) {
  main();
}

module.exports = { replaceInFile, colorReplacements, opacityReplacements };
