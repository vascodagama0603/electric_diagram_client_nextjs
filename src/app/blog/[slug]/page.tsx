// src/app/blog/[slug]/page.tsx

import { notFound } from 'next/navigation';
import { getBlogArticleBySlug, getBlogArticles } from '../../../lib/microCmsClient'; 
import { PageLayout } from '../../components/LayoutComponents';
import { StyledContentContainer } from '../../components/ContentStyles';
import { BlogTags } from '@/app/components/BlogTag'; // パスは適宜修正

// 💡 新しく作成したクライアントコンポーネントをインポート
import { ArticleContent } from './ArticleClient'; 
import React from 'react'; // JSXを使用するため

interface Article {
    id: string;
    slug: string;
    title: string;
    publishedAt: string;
    body: string;
    tag?: string[]
}
interface BlogDetailPageProps {
    params: {
        slug: string; 
    };
}
const formatDate = (dateString: string): string => {
    if (!dateString) return '日付不明';
    try {
        return new Date(dateString).toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    } catch {
        return dateString;
    }
};

export default async function ArticlePage({ params }: BlogDetailPageProps) {
    const resolvedParams = await Promise.resolve(params);
    const { slug } = resolvedParams;
    const article = await getBlogArticleBySlug(slug) as Article | null;
    if (!article) {
        notFound();
    }


    return (
        <PageLayout>
            <StyledContentContainer>
                <h1>{article.title}</h1>
                <p style={{ color: '#666', fontSize: '0.9em', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                    公開日: {formatDate(article.publishedAt)}
                </p>
                {article.tag && Array.isArray(article.tag) && (
                    <BlogTags tag={article.tag} />
                )}
                <ArticleContent htmlContent={article.body} />

            </StyledContentContainer>
        </PageLayout>
    );
}

export async function generateStaticParams() {
    let articles: { slug: string }[] = [];
    
    try {
        articles = await getBlogArticles(null); 
    } catch (error) {
        console.error("Failed to fetch articles for generateStaticParams:", error);
        return []; 
    }
    if (!Array.isArray(articles)) {
        console.warn("getBlogArticles did not return an array.");
        return [];
    }
    return articles.map((article) => ({
        slug: article.slug,
    }));
}

