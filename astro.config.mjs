// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  prefetch: true,

  integrations: [react(), mdx()],

  image: {
    service: passthroughImageService()
  },

  vite: {
    plugins: [tailwindcss()]
  }
});