import type { ImageMetadata } from 'astro';

type Mod = { default: ImageMetadata };

const photos = import.meta.glob<Mod>('../assets/photos/*.jpg', { eager: true });
const backgrounds = import.meta.glob<Mod>('../assets/bg/*.jpg', { eager: true });
/** Images carried over from the current site (akt-*, medij-*, izv-*, mural-*, merch-*). */
const siteImages = import.meta.glob<Mod>('../assets/site/*.{webp,jpg,jpeg,png}', { eager: true });

const base = (p: string) => p.split('/').pop()!.replace(/\.\w+$/, '');

export function photo(name: string): ImageMetadata {
  const mod = photos[`../assets/photos/${name}.jpg`];
  if (!mod) throw new Error(`Missing photo "${name}" in src/assets/photos`);
  return mod.default;
}

export type BgName = 'mesh' | 'mesh2' | 'baby' | 'blue' | 'swirl' | 'pink';

export function background(name: BgName, orientation: 'landscape' | 'portrait'): ImageMetadata {
  const mod = backgrounds[`../assets/bg/${orientation}-${name}.jpg`];
  if (!mod) throw new Error(`Missing background ${orientation}-${name}`);
  return mod.default;
}

/** All carried-over images whose file name starts with `prefix`, in natural order. */
export function siteSet(prefix: string): { name: string; src: ImageMetadata }[] {
  return Object.entries(siteImages)
    .map(([path, mod]) => ({ name: base(path), src: mod.default }))
    .filter((img) => img.name.startsWith(prefix))
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
}
