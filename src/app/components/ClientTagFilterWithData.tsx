// src/app/components/ClientTagFilterWithData.tsx
'use client';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getBlogArticles, ArticleItem } from '../../lib/microCmsClient';
import ClientTagFilter from './ClientTagFilter';

export default function ClientTagFilterWithData() {
    const router = useRouter();
    const searchParams = useSearchParams();    
    const [articles, setArticles] = useState<ArticleItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const currentTag = searchParams.get('tag');
    useEffect(() => {
        const fetchAndSetArticles = async () => {
            setIsLoading(true);
            try {
                const data = await getBlogArticles(currentTag); 
                setArticles(data);
            } catch (error) {
                console.error("Failed to fetch articles on client:", error);
                setArticles([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAndSetArticles();
    }, [currentTag]);

    const handleTagSelect = (tag: string) => {
        let newTag: string | null = tag;
        if (tag === currentTag) {
            newTag = null;
        }
        if (newTag) {
            router.push(`/blog?tag=${encodeURIComponent(newTag)}`);
        } else {
            router.push('/blog');
        }
    };

    if (isLoading) {
        return <p>記事を読み込み中...</p>;
    }
    
    return (
        <ClientTagFilter 
            articles={articles} 
            selectedTag={currentTag} 
            onTagClick={handleTagSelect} 
        />
    );
}