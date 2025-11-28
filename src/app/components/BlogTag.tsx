// src/app/components/BlogTag.tsx
"use client"; 
import Link from "next/link"; 
import {BlogTagsProps} from '../../lib/type'
import { TagsContainer,TagBadge } from '../../styles/GeneralStyles';

export const BlogTags: React.FC<BlogTagsProps> = ({ tag }) => {
    if (!tag || tag.length === 0) return null;
    return (
        <TagsContainer>
            {tag.map(tagName => (
                <Link href={`/blog?tag=${encodeURIComponent(tagName)}`} key={encodeURIComponent(tagName)}>
                    <TagBadge>
                        #{tagName}
                    </TagBadge>
                </Link>
            ))}
        </TagsContainer>
    );
};