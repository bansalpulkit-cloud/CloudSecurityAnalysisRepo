import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // Your actual production domain is required for absolute sitemap URLs
  site: 'https://cloudsecurityanalysis.com',
  integrations: [sitemap()]
});