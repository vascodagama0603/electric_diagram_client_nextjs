// src/app/components/ClientTagFilterWithData.tsx
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getBlogArticles, ArticleItem } from '@/lib/microCmsClient'; // 💡 APIをインポート

import ClientTagFilter from './ClientTagFilter'; // 💡 ClientTagFilter は以前のロジックを持つものとする

// 💡 データ取得とフィルターロジックを Client Component で統合
export default function ClientTagFilterWithData() {
    const router = useRouter();
    const searchParams = useSearchParams(); // クライアント側でのみ使用可能
    
    const [articles, setArticles] = useState<ArticleItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    
    // 1. URLから現在のタグを取得
    const currentTag = searchParams.get('tag');

    // 2. useEffectでデータ取得（タグが変更されるたびに実行）
    useEffect(() => {
        const fetchAndSetArticles = async () => {
            setIsLoading(true);
            try {
                // 💡 getBlogArticles をクライアント側で呼び出す
                // サーバー側のダミーロジックはここでスキップされ、本物のAPIが呼ばれる
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
    }, [currentTag]); // 💡 currentTag が変更されるたびに再実行される

    // 3. タグクリック時のハンドラ (URL更新)
    const handleTagSelect = (tag: string) => {
        let newTag: string | null = tag;
        
        // 既に選択されているタグを再度クリックしたら、フィルタを解除
        if (tag === currentTag) {
            newTag = null;
        }

        // URLを更新し、useEffectによる再フェッチをトリガーする
        if (newTag) {
            router.push(`/blog?tag=${encodeURIComponent(newTag)}`);
        } else {
            router.push('/blog'); // フィルタ解除
        }
    };

    if (isLoading) {
        return <p>記事を読み込み中...</p>; // ロード中の表示
    }
    
    return (
        <ClientTagFilter 
            articles={articles} 
            selectedTag={currentTag} 
            onTagClick={handleTagSelect} 
        />
    );
}