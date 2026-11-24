/**
 * Site-wide settings. Fill in the TODOs before going live.
 * Anything left empty is simply not rendered (no dead links).
 */
export const site = {
  contactName: 'Marko Boko, GNG',
  // TODO: switch to a domain address (e.g. partners@<gng-domain>) — reads more credible to brands.
  contactEmail: 'boko.marko@gmail.com',
  /** YouTube video IDs for the aftermovie toggle, e.g. "dQw4w9WgXcQ". TODO: copy from the current site. */
  aftermovies: {
    latest: '',
    y2025: '',
  },
  social: {
    instagram: 'https://www.instagram.com/graffitinagradele/',
    facebook: '', // TODO
    youtube: '', // TODO
  },
} as const;
