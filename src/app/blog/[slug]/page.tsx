// src/app/blog/[slug]/page.tsx

import { notFound } from 'next/navigation';
import { getBlogArticleBySlug, getBlogArticles } from '../../../lib/microCmsClient'; 
import { PageLayout } from '../../components/LayoutComponents';
import { StyledContentContainer } from '../../components/ContentStyles';
import { BlogTags } from '@/app/components/BlogTag';
import { ArticleContent } from './ArticleClient'; 
import React from 'react';
import { Metadata } from 'next';
import { extractHeadings } from '../../../lib/articleUtils'; // 💡 新しいユーティリティをインポート
import { TableOfContents } from './TableOfContents'; // 💡 新しいコンポーネントをインポート

export async function generateMetadata(props: any): Promise<Metadata> {
    const resolvedParams = await props.params;
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const slug = resolvedParams.slug;
    const article = await getBlogArticleBySlug(slug);
    if (!article) {
        return {
            title: '記事が見つかりません | [あなたのサイト名]',
            description: 'お探しのページは見つかりませんでした。',
        };
    }
    const pageTitle = `${article.title} | 電気設計 技術ブログ`;
    const pageDescription = article.description ? article.description.substring(0, 160) : '電気設計や制御技術に関する詳細記事です。'; 
    const keywordsFromField = typeof article.keyword === 'string' && article.keyword.length > 0
        ? article.keyword.split(',').map(k => k.trim()).filter(k => k.length > 0)
        : [];
    return {
        title: pageTitle,
        description: pageDescription,
        keywords: [
            article.title, 
            "電気設計", 
            "制御技術", 
            "CAD", 
            ...keywordsFromField,
        ],
        openGraph: {
            title: pageTitle,
            description: pageDescription,
            url: `${baseUrl}/blog/${slug}`,
        },
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

export default async function BlogDetail(props: any) {
    let slug: string;
    try {
        const resolvedParams = await (props.params as any);
        slug = resolvedParams.slug;
    } catch (e) {
        slug = (props.params as { slug: string }).slug;
    }
    if (!slug) {
        notFound();
    }
    const article = await getBlogArticleBySlug(slug);
    if (!article) {
        notFound();
    }
    const headings = extractHeadings(article.body);
    if (!article || Array.isArray(article) || typeof article !== 'object') {
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
                <TableOfContents headings={headings} />
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

