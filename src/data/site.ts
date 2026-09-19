export const site = {
  name: 'Gearky',
  domain: 'gearky.com',
  url: 'https://gearky.com',
  tagline: 'PlayStation gear, storage & console guides',
  description:
    'Gearky is an independent buyer\'s guide covering PlayStation controllers, accessories, SSD storage upgrades, console buying, and deals.',
  author: 'Gearky Team',
  email: 'hello@gearky.com',
  social: {
    twitter: 'https://x.com/gearky',
    youtube: 'https://youtube.com/@gearky',
  },
} as const;

/**
 * Affiliate program config. Program-agnostic: the CTA links to the full URL
 * provided in each article's `meta.affiliateUrl`, so any merchant works.
 */
export const affiliate = {
  ctaText: 'Check Price',
} as const;

export interface Author {
  name: string;
  slug: string;
  role: string;
  bio: string;
}

export const authors: Record<string, Author> = {
  'Lucas Hart': {
    name: 'Lucas Hart',
    slug: 'lucas-hart',
    role: 'Lead Reviewer',
    bio: 'Lucas Hart has spent five years testing PlayStation hardware, from hall effect controllers to SSD storage upgrades, and writes hands-on buying guides for Gearky.',
  },
};

export type CategorySlug = 'controllers' | 'storage' | 'console' | 'deals';

export interface Category {
  slug: CategorySlug;
  label: string;
  title: string;
  description: string;
  /** Short keyword-ish description used for cards/SEO. */
  blurb: string;
}

export const categories: Category[] = [
  {
    slug: 'controllers',
    label: 'Controllers',
    title: 'Controllers & Accessories',
    description:
      'In-depth reviews and buying guides for PS5, PS4, and third-party controllers — hall effect sticks, batteries, cables, charging docks, skins, and more.',
    blurb: 'Hands-on controller and accessory reviews',
  },
  {
    slug: 'storage',
    label: 'Storage',
    title: 'SSD & Storage Upgrades',
    description:
      'The best SSDs and storage upgrades for PS5 and PS4 — compatibility, speeds, heatsinks, and step-by-step install guides.',
    blurb: 'PS5 & PS4 SSD and storage upgrades',
  },
  {
    slug: 'console',
    label: 'Console',
    title: 'Console, Skins & Used',
    description:
      'Console buying advice, PS5 skins, selling and buying used consoles, plus PS5 vs Xbox comparisons to help you decide.',
    blurb: 'Console buying, skins, and used-market guides',
  },
  {
    slug: 'deals',
    label: 'Deals',
    title: 'Deals & Game Guides',
    description:
      'PlayStation discount codes, bundle deals, and curated game recommendations — best single-player, RPG, and multiplayer titles.',
    blurb: 'Discounts, promo codes, and game picks',
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
