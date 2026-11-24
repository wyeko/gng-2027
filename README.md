# GNG 2027 — partnership website

Graffiti na Gradele 2027 (Bol, Brač, 21–25 July 2027). Static Astro site, EN at `/`, HR at `/hr/`.

## Run locally

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static output in dist/
npm run preview    # serve dist/
```

Live: https://gng-2027.vercel.app (Vercel, deploys on every push to `main`).

The site is private (shared with partners by link): it is blocked from search
engines with a `noindex` meta tag, `robots.txt` and an `X-Robots-Tag` header
(`vercel.json`). Link previews (Open Graph) still work when the link is shared.

## Where things live

| What | Where |
|---|---|
| Copy (EN / HR) | `src/i18n/en.ts`, `src/i18n/hr.ts` |
| Contact, social links, aftermovie IDs | `src/config.ts` |
| Instagram post URLs | `src/data/instagram-posts.json` |
| Sections (one component each) | `src/components/*.astro` |
| Design tokens, type scale, buttons | `src/styles/global.css` |
| Motion (3 easings, reveals, signature moments) | `src/styles/motion.css` |
| Behaviour (reveals, video, picker `?kat=`, IG lazy embeds, aftermovie) | `src/scripts/main.ts` |
| Photos (WebP generated at build, max 1600 px) | `src/assets/photos/` |
| Section backgrounds (landscape + portrait) | `src/assets/bg/` |
| Logos, cloud mask, sparkle | `src/assets/brand/` |
| Images from the previous site (`akt-*`, `medij-*`, `izv-*`, `mural-*`, `merch-*`) | `src/assets/site/` — drop files in, they appear automatically |
| Hero video (muted, faststart) | `public/video/hero-muted.mp4` |

## Design system rules (from the brief)

- Archivo variable, display at `font-stretch: 125%`, 800, uppercase.
- Type scale is locked: 13 / 16 / 18 / 22 / 32 / 40 px + H1/H2 clamps.
- `#FF0470` only for accent words in large headings; white text sits on `#D40062`.
- Adjacent sections never share a background.
- Every number comes from GNG's own 2026 data. Do not add figures without a source.
