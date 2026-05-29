import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://fortworthdev.com',
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    tailwind(),
    mdx(),
  ],
});
