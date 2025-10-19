// src/app/components/BlogTag.tsx
"use client"; 

import styled from "@emotion/styled";
import Link from "next/link"; 


interface BlogTagsProps {
    tag: string[]; // タグ名（文字列）の配列
}

const TagsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 15px;
    padding: 10px 0;
`;

const TagBadge = styled.span`
    display: inline-block;
    padding: 6px 12px;
    background-color: #f0f0f0; // 背景色（薄いグレー）
    color: #495057; // 文字色（濃いグレー）
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background-color: #e0e0e0; // ホバー時
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
`;

export const BlogTags: React.FC<BlogTagsProps> = ({ tag }) => {
    if (!tag || tag.length === 0) return null;

    return (
        <TagsContainer>
            {tag.map(tagName => (
                <Link href={`/blog/tag/${tagName}`} key={tagName}>
                    <TagBadge>
                        #{tagName}
                    </TagBadge>
                </Link>
            ))}
        </TagsContainer>
    );
};