import { MetadataRoute } from 'next';
import { SEED_WALLETS, SEED_MACHINERY, SEED_BLOG_POSTS } from '@/lib/seed-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ironforge.gg';

  const staticRoutes = [
    '',
    '/gym',
    '/wallets',
    '/machinery',
    '/blog',
    '/about',
    '/contact',
    '/careers',
    '/privacy',
    '/terms',
    '/warranty',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  const productRoutes = [...SEED_WALLETS, ...SEED_MACHINERY].map((p) => ({
    url: `${baseUrl}/product/${p.slug}`,
    lastModified: new Date(),
  }));

  const blogRoutes = SEED_BLOG_POSTS.map((b) => ({
    url: `${baseUrl}/blog/${b.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...productRoutes, ...blogRoutes];
}
