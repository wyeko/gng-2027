// @ts-check
import { defineConfig } from 'astro/config';

// Set SITE_URL at build time (e.g. https://partners.graffitinagradele.hr)
// so canonical and hreflang links are absolute.
export default defineConfig({
  site: process.env.SITE_URL || undefined,
  trailingSlash: 'ignore',
  i18n: {
    locales: ['en', 'hr'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false },
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
