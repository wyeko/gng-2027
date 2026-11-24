const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

/* ---------- scroll reveals (fire once) ---------- */
function initReveals() {
  const targets = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (!('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    },
    { threshold: 0.2, rootMargin: '0px 0px -10% 0px' },
  );
  targets.forEach((el) => io.observe(el));

  // the spray-wipe heading reveals with its own trigger
  document.querySelectorAll<HTMLElement>('.spray-on-scroll').forEach((el) => {
    if (!el.hasAttribute('data-reveal')) io.observe(el);
  });
}

/* ---------- sticky header gets a surface once the page scrolls ---------- */
function initHeader() {
  const header = document.querySelector<HTMLElement>('[data-header]');
  const sentinel = document.querySelector<HTMLElement>('[data-header-sentinel]');
  if (!header || !sentinel) return;
  new IntersectionObserver(([entry]) => {
    header.classList.toggle('is-stuck', !entry.isIntersecting);
  }).observe(sentinel);
}

/* ---------- hero: muted autoplay, poster only for reduced motion ---------- */
function initHero() {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  const video = document.querySelector<HTMLVideoElement>('[data-hero-video]');
  if (!hero) return;

  const play = () => {
    if (!video || reduceMotion.matches) return;
    video.muted = true; // must be set in JS too, or some browsers block autoplay
    const p = video.play();
    if (p) p.catch(() => {/* autoplay refused: the poster stays, which is fine */});
  };

  new IntersectionObserver(([entry]) => {
    hero.classList.toggle('is-visible', entry.isIntersecting);
    if (!video) return;
    if (entry.isIntersecting) play();
    else video.pause();
  }).observe(hero);

  reduceMotion.addEventListener('change', () => {
    if (!video) return;
    if (reduceMotion.matches) video.pause();
    else play();
  });
}

/* ---------- EN/HR switch keeps the section you are reading ---------- */
function initLangLinks() {
  document.querySelectorAll<HTMLAnchorElement>('[data-lang-link]').forEach((a) => {
    a.addEventListener('click', () => {
      const url = new URL(a.href);
      url.search = location.search;
      url.hash = location.hash;
      a.href = url.toString();
    });
  });
}

/* ---------- category picker: ?kat=<id> preselects, and the URL follows ---------- */
function initPicker() {
  const form = document.querySelector<HTMLFormElement>('[data-picker]');
  if (!form) return;
  const kat = new URLSearchParams(location.search).get('kat');
  if (kat) {
    const radio = form.querySelector<HTMLInputElement>(`input[name="kat"][value="${CSS.escape(kat)}"]`);
    if (radio) radio.checked = true;
  }
  form.addEventListener('change', (e) => {
    const input = e.target as HTMLInputElement;
    if (input.name !== 'kat') return;
    const url = new URL(location.href);
    url.searchParams.set('kat', input.value);
    history.replaceState(history.state, '', url);
  });
}

/* ---------- Instagram: embed.js only loads when the section is near ---------- */
function initInstagram() {
  const section = document.querySelector<HTMLElement>('[data-ig-section]');
  if (!section) return;
  const cards = [...section.querySelectorAll<HTMLElement>('[data-ig-url]')];
  if (cards.length === 0) return; // no post URLs yet: static fallbacks stay

  const load = () => {
    for (const card of cards) {
      const quote = document.createElement('blockquote');
      quote.className = 'instagram-media';
      quote.setAttribute('data-instgrm-permalink', card.dataset.igUrl!);
      quote.setAttribute('data-instgrm-version', '14');
      // keep the fallback link inside, so the card still works if embedding fails
      const fallback = card.querySelector('a');
      if (fallback) quote.append(fallback.cloneNode(true));
      card.replaceChildren(quote);
    }
    type Instgrm = { Embeds: { process(): void } };
    const w = window as Window & { instgrm?: Instgrm };
    if (w.instgrm) return w.instgrm.Embeds.process();
    const s = document.createElement('script');
    s.src = 'https://www.instagram.com/embed.js';
    s.async = true;
    document.body.append(s);
  };

  const io = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      load();
    },
    { rootMargin: '400px 0px' },
  );
  io.observe(section);
}

/* ---------- aftermovie: toggle Latest / 2025, inline YouTube on play ---------- */
function initAftermovie() {
  const root = document.querySelector<HTMLElement>('[data-aftermovie]');
  if (!root) return;
  const options = [...document.querySelectorAll<HTMLButtonElement>('[data-am-toggle] [data-film]')];
  const playBtn = root.querySelector<HTMLButtonElement>('[data-play]');
  const player = root.querySelector<HTMLElement>('[data-player]');
  let current = options.find((o) => o.getAttribute('aria-pressed') === 'true')?.dataset.film ?? '';

  const mount = (id: string) => {
    if (!player || !id) return;
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0&playsinline=1`;
    iframe.title = playBtn?.getAttribute('aria-label') ?? 'Aftermovie';
    iframe.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    iframe.allowFullscreen = true;
    player.replaceChildren(iframe);
    player.hidden = false;
    iframe.focus();
  };

  options.forEach((btn) =>
    btn.addEventListener('click', () => {
      options.forEach((o) => o.setAttribute('aria-pressed', String(o === btn)));
      current = btn.dataset.film ?? '';
      if (player && !player.hidden) mount(current); // already playing: switch film
    }),
  );
  playBtn?.addEventListener('click', () => mount(current));
}

initReveals();
initHeader();
initHero();
initLangLinks();
initPicker();
initInstagram();
initAftermovie();
