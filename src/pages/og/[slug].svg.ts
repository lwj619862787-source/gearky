import type { APIRoute } from 'astro';
import { collectPosts } from '../../lib/posts';
import { generateCoverSvg } from '../../lib/og';
import { getCategory } from '../../data/site';
import { typeLabel } from '../../types/article';

const posts = collectPosts(import.meta.glob('../*/*.astro', { eager: true }));

export function getStaticPaths() {
  return posts.map((p) => ({ params: { slug: p.slug } }));
}

export const GET: APIRoute = ({ params }) => {
  const slug = params.slug ?? '';
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return new Response('Not found', { status: 404 });
  }

  const svg = generateCoverSvg({
    title: post.title,
    keyword: post.keyword,
    categoryLabel: getCategory(post.category)?.label,
    typeLabel: typeLabel[post.type],
  });

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
