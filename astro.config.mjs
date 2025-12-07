import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import aws from 'astro-sst';

export default defineConfig({
  output: "server",
  adapter: aws(),
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    mdx(),
  ],
  vite: {
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  },
});
