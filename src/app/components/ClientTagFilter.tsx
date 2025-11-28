// src/app/components/ClientTagFilter.tsx
'use client';
import { useMemo } from 'react';
import { BlogCatalog } from './BlogCatalog'; 
import { ArticleItem } from '../../lib/type'
import { FilteredTagButton,FilterdButtonLayout,FilterCancelButton } from '../../styles/GeneralStyles';

export default function ClientTagFilter({ 
        articles, 
        selectedTag, 
        onTagClick }: 
    { 
        articles: ArticleItem[], 
        selectedTag: string | null,
        onTagClick: (tag: string) => void}){ 
    const allUniqueTags: string[] = useMemo(() => {
        const tags = new Set<string>();
        if (Array.isArray(articles)) {
        articles.forEach(article => {
            if (Array.isArray(article.tag)) {
                article.tag.forEach(t => tags.add(t));
            }
        });
        }
        return Array.from(tags).sort();
    }, [articles]);
    return (
        <div>
            <FilterdButtonLayout>
                {allUniqueTags.map(tag => {
                    const isSelected = tag === selectedTag;
                    return (
                        <FilteredTagButton
                            key={tag}
                            $active = {isSelected}
                            onClick={() => onTagClick(tag)}
                        >
                            #{tag}
                        </FilteredTagButton>
                    );
                })}
                
                {selectedTag && (
                    <FilterCancelButton 
                        onClick={() => onTagClick(selectedTag)} 
                    >
                        フィルタ解除 (X)
                    </FilterCancelButton>
                )}
            </FilterdButtonLayout>
            <BlogCatalog initialArticles={articles} />
        </div>
    );
}

