import { en, type Dict } from './en';
import { hr } from './hr';

export const dicts = { en, hr } satisfies Record<string, Dict>;
export type Lang = keyof typeof dicts;
export const langs = Object.keys(dicts) as Lang[];

export const pathFor = (lang: Lang) => (lang === 'en' ? '/' : `/${lang}/`);
export const t = (lang: Lang): Dict => dicts[lang];
export type { Dict };
