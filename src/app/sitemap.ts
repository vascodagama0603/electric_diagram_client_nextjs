// app/sitemap.ts
import { MetadataRoute } from 'next';
import { getBlogArticles } from '../lib/microCmsClient';
export const dynamic = 'force-static'; 

const baseUrl: string | undefined = process.env.NEXT_PUBLIC_SITE_URL; 

interface SitemapArticle {
    slug: string;
    date: string;
    tag?: string[];
}

interface StaticRoute {
    url: string;
    lastModified: Date;
    changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    priority: number;
}

export default async function sitemap() : Promise<MetadataRoute.Sitemap> {
  if (!baseUrl) {
        // ベースURLがない場合は、空の配列を返してエラーを防ぐ
        console.error("NEXT_PUBLIC_SITE_URL is not set.");
        return [];
    }
  const allArticles: SitemapArticle[] = await getBlogArticles(null) as SitemapArticle[];
  const articleUrls: MetadataRoute.Sitemap = allArticles.map(article => ({
        url: `${baseUrl}/blog/${article.slug}`,
        lastModified: new Date(article.date), 
        changeFrequency: 'weekly',
        priority: 0.8,
    }));
  const uniqueTags = new Set<string>();
    allArticles.forEach(article => {
        if (Array.isArray(article.tag)) {
            article.tag.forEach(tag => uniqueTags.add(tag));
        }
    });
  const tagUrls: MetadataRoute.Sitemap = Array.from(uniqueTags).map(tag => ({
        url: `${baseUrl}/blog/tag/${encodeURIComponent(tag)}`, 
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.7,
    }));
  const staticRoutes: StaticRoute[] = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1.0, 
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  return [
        ...staticRoutes,
        ...articleUrls,
        ...tagUrls,
    ];
}