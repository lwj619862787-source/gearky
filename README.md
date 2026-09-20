# Gearky — PlayStation Gear & Storage Guide

Astro-based affiliate site framework. English, US market, program-agnostic affiliate monetization.

## Quick start

```bash
npm install
npm run dev        # local dev server (http://localhost:4321)
npm run build      # build static site to ./dist
npm run preview    # preview the built site
```

## Site structure

Four content silos, mapped from the keyword plan:

| Section | Route | Covers |
|---------|-------|--------|
| Controllers & Accessories | `/controllers/` | Hall effect controllers, batteries, cables, charging, skins, headsets, mics |
| SSD & Storage Upgrades | `/storage/` | PS5/PS4 SSD, 2TB drives, heatsinks, external storage |
| Console, Skins & Used | `/console/` | PS5 skins, buy/sell used, PS5 vs Xbox comparisons |
| Deals & Game Guides | `/deals/` | Discount codes, bundle deals, game recommendations |

## How to publish an article (manual writing)

Articles are **one file per page**. No index or registry to update — dropping a file in
the right folder auto-lists it on the homepage and its category page.

1. Copy `_templates/article-template.astro` into a category folder:
   ```
   src/pages/controllers/<your-slug>.astro
   ```
2. Rename the file to a URL-safe slug (lowercase + hyphens). The URL becomes
   `https://gearky.pages.dev/controllers/<your-slug>/`.
3. Edit the `meta` object (title, description, category, type, keyword, date, rating, affiliateUrl…).
4. Write your article body inside `<ArticleLayout>`.

The `meta` fields:

| Field | Type | Notes |
|-------|------|-------|
| `title` | string | H1 / page title |
| `description` | string | 120–160 char meta description |
| `category` | `controllers` \| `storage` \| `console` \| `deals` | silo |
| `type` | `review` \| `list` \| `guide` \| `comparison` \| `qa` | shows as a badge |
| `keyword` | string | primary target keyword |
| `date` | `YYYY-MM-DD` | publish date (controls sort order) |
| `updated` | `YYYY-MM-DD` | optional |
| `image` | string | hero image path under `/images/` |
| `featured` | boolean | pin to homepage |
| `rating` | number (0–5) | for `review` type — emits Review schema |
| `affiliateUrl` | string | full affiliate/product link (any merchant) → shows "Check Price" button |

## Affiliate setup

1. Choose any merchant or affiliate network (Amazon, Best Buy, Walmart, Newegg, etc.).
2. In each review's `meta.affiliateUrl`, paste the full product/affiliate link.
3. The CTA text ("Check Price") is set in `src/data/site.ts` under `affiliate.ctaText`.
4. No tracking ID is applied for now — add your own `?tag=` / UTM params to the URL once traffic grows.

## Site config

- Brand, domain, and tagline: `src/data/site.ts`
- Categories (labels + descriptions): `src/data/site.ts`
- Design tokens (colors, fonts, spacing): `src/styles/global.css`

## SEO / GEO

- `public/robots.txt` — sitemap reference
- `public/llms.txt` — AI-search optimization
- Automatic `sitemap-index.xml` via `@astrojs/sitemap`
- JSON-LD emitted automatically: `WebSite`, `Organization`, `Article`,
  `BreadcrumbList`, plus `Review`/`Product` and `FAQPage` when applicable.

## Important

Gearky is not affiliated with or endorsed by Sony Interactive Entertainment.
"PlayStation", "PS5", and related marks are trademarks of their respective owners.
