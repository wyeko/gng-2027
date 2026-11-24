// @ts-check
import { defineConfig } from 'astro/config';

// Origin for absolute link-preview (OG) image URLs.
// Override with SITE_URL if the site moves to another domain.
// The site is private: noindex everywhere (meta, robots.txt, X-Robots-Tag).
export default defineConfig({
  site: process.env.SITE_URL || 'https://gng-2027.vercel.app',
  trailingSlash: 'ignore',
  i18n: {
    locales: ['en', 'hr'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false },
  },
  build: {
    inlineStylesheets: 'always',
  },
});
