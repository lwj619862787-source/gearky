export type CategorySlug = 'controllers' | 'storage' | 'console' | 'deals';

export type ArticleType =
  | 'review' // single product review
  | 'list' // best-of / roundup
  | 'guide' // how-to / buying guide / landing
  | 'comparison' // vs / x vs y
  | 'qa'; // question / FAQ style

export interface ArticleMeta {
  title: string;
  description: string;
  category: CategorySlug;
  type: ArticleType;
  /** Primary target keyword (SEO). */
  keyword: string;
  /** Publish date (ISO yyyy-mm-dd). */
  date: string;
  /** Optional last-updated date. */
  updated?: string;
  /** Path to hero image, e.g. /images/foo.webp */
  image?: string;
  /** Set true to feature on the homepage. */
  featured?: boolean;
  /** Numeric rating out of 5 (reviews). */
  rating?: number;
  /** Price of the top recommended product in USD (for Product schema). */
  price?: number;
  /** Full affiliate/product URL (any merchant — Amazon, Best Buy, etc.). */
  affiliateUrl?: string;
  author?: string;
  /** Short author credential line for Person schema / EEAT. */
  authorBio?: string;
}

export const typeLabel: Record<ArticleType, string> = {
  review: 'Review',
  list: 'Best Of',
  guide: 'Guide',
  comparison: 'Comparison',
  qa: 'Q&A',
};

/** An article with its URL slug (derived from the file name). */
export type Post = ArticleMeta & { slug: string };
