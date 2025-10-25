// src/app/components/ClientTagFilter.tsx (クライアントコンポーネント)
'use client';

import { useState, useMemo } from 'react';
import { BlogCatalog } from './BlogCatalog'; // 既存の記事一覧コンポーネント
// ArticleItem の型定義をインポートするか、ここに定義

// 💡 注意: 外部から ArticleItem の型をインポートしてください
interface ArticleItem {
    slug: string; title: string; summary: string; date: string; image: string; tag: string[];
}

export default function ClientTagFilter({ 
    articles, 
    selectedTag, 
    onTagClick 
}: { 
    // 💡 修正: ここも新しいプロパティ名に合わせる
    articles: ArticleItem[], 
    selectedTag: string | null,
    onTagClick: (tag: string) => void
})  { 
// 1. 全てのユニークなタグを抽出 (渡された記事から抽出)
    const allUniqueTags: string[] = useMemo(() => {
        const tags = new Set<string>();
        if (Array.isArray(articles)) {
        articles.forEach(article => {
            // 💡 修正: article.tag も配列であることを確認
            if (Array.isArray(article.tag)) {
                article.tag.forEach(t => tags.add(t));
            }
        });
    }
        return Array.from(tags).sort();
    }, [articles]);

    // 💡 修正: 記事は既にフィルタリングされているので、そのまま BlogCatalog に渡す
    
return (
        <div>
            {/* タグ選択UI */}
            <div style={{ 
                marginBottom: '20px', 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '8px' // ボタン間のスペースを調整
            }}>
                {allUniqueTags.map(tag => {
                    const isSelected = tag === selectedTag;
                    return (
                        <button
                            key={tag}
                            onClick={() => onTagClick(tag)}
                            // 💡 修正: モダンなスタイルを適用
                            style={{
                                padding: '8px 16px',
                                border: isSelected ? '1px solid #007bff' : '1px solid #ccc',
                                borderRadius: '20px', // 角を丸く
                                cursor: 'pointer',
                                transition: 'all 0.3s ease', // アニメーション
                                backgroundColor: isSelected ? '#007bff' : '#f8f9fa', // 選択時: プライマリカラー、非選択時: ライトグレー
                                color: isSelected ? 'white' : '#333',
                                fontWeight: isSelected ? 'bold' : 'normal',
                                // ホバー効果はCSS/Styled Componentsで実装するのが理想的ですが、インラインスタイルでは限界があるため、基本的な色分けに留めます。
                            }}
                        >
                            #{tag}
                        </button>
                    );
                })}
                
                {/* フィルタ解除ボタン */}
                {selectedTag && (
                    <button 
                        onClick={() => onTagClick(selectedTag)} 
                        // 💡 修正: 目立ちすぎず、解除が明確なデザイン
                        style={{ 
                            marginLeft: '10px', 
                            padding: '8px 16px',
                            border: '1px solid #dc3545', // 赤系の枠線
                            borderRadius: '20px', 
                            cursor: 'pointer',
                            backgroundColor: 'transparent', // 背景を透明に
                            color: '#dc3545', // 赤系のテキストカラー
                            fontWeight: 'normal',
                            // ホバー時の透過度変更などを追加するとさらにモダンになります
                        }}
                    >
                        フィルタ解除 (X)
                    </button>
                )}
            </div>

            {/* フィルタリングされた記事一覧 */}
            <BlogCatalog initialArticles={articles} />
        </div>
    );
}