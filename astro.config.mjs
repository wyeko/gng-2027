// @ts-check
import { defineConfig } from 'astro/config';

// Canonical, hreflang and OG URLs are absolute against this origin.
// Override with SITE_URL when the site moves to its own domain.
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
