import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import aws from 'astro-sst';

export default defineConfig({
  output: "server",
  adapter: aws(),
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    })
  ],
  vite: {
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  },
});
