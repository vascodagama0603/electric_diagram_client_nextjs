// src/app/blog/[slug]/page.tsx

import { notFound } from 'next/navigation';
import { getBlogArticleBySlug, getBlogArticles } from '../../../lib/microCmsClient'; 
import { PageLayout } from '../../components/LayoutComponents';
import { StyledContentContainer } from '../../components/ContentStyles';
import { BlogTags } from '@/app/components/BlogTag';
import { ArticleContent } from './ArticleClient'; 
import React from 'react';

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

export default async function BlogDetail(props: { params: { slug: string } }) {
    let slug: string;
    
    try {
        const resolvedParams = await (props.params as any);
        slug = resolvedParams.slug;
    } catch (e) {
        // Promiseではない場合に備えたフォールバック（保険）
        slug = (props.params as { slug: string }).slug;
    }  

    if (!slug) {
        notFound();
    }
    
    // 記事データの取得
    const article = await getBlogArticleBySlug(slug);

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
    const articlePaths = articles.map((article) => ({
      slug: article.slug,
    }));

    const fallbackPath = { slug: '' };          
    return [...articlePaths, fallbackPath];
}

