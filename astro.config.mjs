// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  prefetch: true,

  integrations: [react()],

  image: {
    service: passthroughImageService()
  },

  vite: {
    plugins: [tailwindcss()]
  }
});