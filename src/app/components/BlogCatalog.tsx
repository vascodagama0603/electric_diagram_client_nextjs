// src/app/components/BlogCatalog.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link'; 
import { getBlogArticles } from '../../lib/microCmsClient'; 
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
    const [articles, setArticles] = useState<Article[]>(initialArticles);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (initialArticles && initialArticles.length > 0) {
            setIsLoading(false);
            return; 
        }
        const fetchArticles = async () => {      
            try {
                const data: Article[] = await getBlogArticles(null); 
                setArticles(data);
                setError(null);
            } catch (err) {
                console.error("Failed to fetch blog articles:", err);
                setError('記事の読み込み中にエラーが発生しました。');
            } finally {
                setIsLoading(false);
            }
        };

        fetchArticles();
    }, [initialArticles]);

    return (
        <>
            <BlogPageTitle>💡 電気設計 技術ブログ</BlogPageTitle>            
            {isLoading && <StatusMessage>記事を読み込み中...</StatusMessage>}
            {error && <StatusMessage style={{ color: 'red' }}>エラー: {error}</StatusMessage>}

            {/* 💡 記事一覧の表示 (Linkコンポーネントを使用) */}
            {!isLoading && articles.length === 0 && (
                <StatusMessage>現在、公開されている記事はありません。</StatusMessage>
            )}
            
            {!isLoading && articles.length > 0 && (
                <BlogContainer>
                    {articles.map((article) => (
                        <Link href={`/blog/${article.slug}`} key={article.slug}>
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