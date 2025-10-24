// src/app/components/BlogCatalog.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link'; 
import { 
    BlogPageTitle, BlogContainer, BlogArticleCard, 
    ArticleImage, ArticleContent, ArticleTitle, 
    ArticleSummary, ArticleMeta, TagList, Tag, StatusMessage 
} from '../../styles/GeneralStyles'; 


interface Article {
    slug: string;
    title: string;
    summary: string;
    date: string; 
    tag: string[];
    image: string | null;
}
interface BlogCatalogProps {
    initialArticles: Article[]; 
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

export const BlogCatalog: React.FC<BlogCatalogProps> = ({ initialArticles }) => {
    const articles = initialArticles; 
    return (
        <>
           <BlogPageTitle>💡 電気設計 技術ブログ</BlogPageTitle> 
            {/* 💡 ロード/エラー表示は親コンポーネント（ClientTagFilter）で管理可能 */}

            {/* 記事一覧の表示 */}
            {articles.length === 0 && (
                <StatusMessage>該当する記事はありません。</StatusMessage>
            )}
            
            {articles.length > 0 && (
                <BlogContainer>
                    {articles.map((article) => (
                        <Link href={`/blog/${article.slug}`} key={article.slug}>
                            {/* ... (カードのレンダリングロジックは維持) ... */}
                            <BlogArticleCard>
                                <ArticleImage src={article.image || '/default-blog-image.jpg'} />
                                <ArticleContent>
                                    <ArticleTitle>{article.title}</ArticleTitle>
                                    <ArticleSummary>{article.summary}</ArticleSummary>
                                    <ArticleMeta>
                                        <span>{formatDate(article.date)}</span>
                                        <TagList>
                                            {Array.isArray(article.tag) && article.tag.map(tag => (
                                                <Tag key={tag}>{tag}</Tag>
                                            ))}
                                        </TagList>
                                    </ArticleMeta>
                                </ArticleContent>
                            </BlogArticleCard>
                        </Link>
                    ))}
                </BlogContainer>
            )}
        </>
    );
}