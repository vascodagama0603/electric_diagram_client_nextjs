// src/app/blog/tag/[tagName]/page.tsx
// サーバーコンポーネント (RSC)

import { getBlogArticles } from '../../../../lib/microCmsClient';
import { PageLayout } from '../../../components/LayoutComponents';
import { BlogCatalog } from '../../../components/BlogCatalog'; 
import { notFound } from 'next/navigation'; // notFoundをインポート

interface ArticleForStatic {
    slug: string;
    tag?: string[]; 
}

export default async function TagPage( params : Promise<{ tagName: string }>) {
    const resolvedParams = await Promise.resolve(params);
    const { tagName: rawTagName } = resolvedParams;
    if (!rawTagName) {
        return notFound();
    }
    const tagName = decodeURIComponent(rawTagName); 
    const articles = await getBlogArticles(tagName);
    return (
        <PageLayout>
            <h1 style={{ marginBottom: '20px' }}>
                タグ: <span style={{ color: '#007bff' }}>#{tagName}</span> の記事一覧
            </h1>
            
            {articles.length > 0 ? (
                <BlogCatalog initialArticles={articles} />
            ) : (
                <p>「{tagName}」タグに一致する記事は見つかりませんでした。</p>
            )}
        </PageLayout>
    );
}

export async function generateStaticParams() {
    const allArticles: ArticleForStatic[] = await getBlogArticles(null);
    const uniqueTags = new Set<string>();
    
    allArticles.forEach(article => {
        if (Array.isArray(article.tag)) {
            article.tag.forEach(tag => uniqueTags.add(tag));
        }
    });

    return Array.from(uniqueTags).map(tag => ({
        tagName: encodeURIComponent(tag),
    }));
}