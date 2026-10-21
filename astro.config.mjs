// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// GitHub Pages project site: https://abu-salah-musha-lemon.github.io/asm-nu-cse-v2/
// If you rename the repo again, update `base` below to match the new repo name.
// https://astro.build/config
export default defineConfig({
  site: 'https://abu-salah-musha-lemon.github.io',
  base: '/asm-nu-cse',
  trailingSlash: 'always',
  vite: {
    plugins: [tailwindcss()]
  }
});