// src/app/components/ClientTagFilter.tsx (クライアントコンポーネント)
'use client';

import { useState, useMemo } from 'react';
import { BlogCatalog } from './BlogCatalog'; // 既存の記事一覧コンポーネント
// ArticleItem の型定義をインポートするか、ここに定義

// 💡 注意: 外部から ArticleItem の型をインポートしてください
interface ArticleItem {
    slug: string; title: string; summary: string; date: string; image: string; tag: string[];
}

export default function ClientTagFilter({ initialArticles }: { initialArticles: ArticleItem[] }) {
    
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    // 1. 全てのユニークなタグを抽出
    const allUniqueTags: string[] = useMemo(() => {
        const tags = new Set<string>();
        initialArticles.forEach(article => {
            article.tag.forEach(t => tags.add(t));
        });
        return Array.from(tags).sort();
    }, [initialArticles]);

    // 2. 記事のフィルタリング
    const filteredArticles = useMemo(() => {
        if (!selectedTag) {
            return initialArticles;
        }
        return initialArticles.filter(article => 
            article.tag.includes(selectedTag)
        );
    }, [initialArticles, selectedTag]);

    const handleTagClick = (tag: string) => {
        // 既に選択されているタグを再度クリックしたら解除
        setSelectedTag(tag === selectedTag ? null : tag);
    };

    return (
        <div>
            {/* タグ選択UI */}
            <div style={{ marginBottom: '20px' }}>
                {allUniqueTags.map(tag => (
                    <button
                        key={tag}
                        onClick={() => handleTagClick(tag)}
                        style={{
                            marginRight: '10px',
                            padding: '5px 10px',
                            cursor: 'pointer',
                            border: '1px solid #ccc',
                            backgroundColor: tag === selectedTag ? '#0070f3' : 'white',
                            color: tag === selectedTag ? 'white' : 'black',
                        }}
                    >
                        #{tag}
                    </button>
                ))}
                
                {/* フィルタ解除ボタン */}
                {selectedTag && (
                    <button onClick={() => setSelectedTag(null)} style={{ marginLeft: '10px', color: 'red', cursor: 'pointer' }}>
                        フィルタ解除 (X)
                    </button>
                )}
            </div>

            {/* フィルタリングされた記事一覧 */}
            <BlogCatalog initialArticles={filteredArticles} />
        </div>
    );
}