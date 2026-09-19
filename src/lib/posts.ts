import type { ArticleMeta, Post } from '../types/article';

/**
 * Collect and sort article metadata from an `import.meta.glob` result.
 * Articles are discovered automatically from `.astro` files that export `meta`.
 * The URL slug is derived from the file name so links always match routes.
 */
export function collectPosts(glob: Record<string, unknown>): Post[] {
  return Object.entries(glob)
    .filter(([path]) => !path.endsWith('index.astro'))
    .map(([path, mod]) => {
      const meta = (mod as { meta?: ArticleMeta }).meta;
      if (!meta || !meta.title) return null;
      const slug = path.split('/').pop()?.replace(/\.astro$/, '') ?? '';
      return { ...meta, slug };
    })
    .filter((p): p is Post => p !== null)
    .sort((a, b) => (b.date || '').localeCompare(a.date || ''));
}
