// src/app/blog/[slug]/TableOfContents.tsx
"use client";
import React from 'react';
import { TocContainer, TocList, TocItem, TocTitle} from '../../../styles/GeneralStyles';
import {TableOfContentsProps} from '../../../lib/type'

export const TableOfContents: React.FC<TableOfContentsProps> = ({ headings }) => {
    if (headings.length === 0) return null;
    return (
        <TocContainer>
            <TocTitle>📝 目次 (Table of Contents)</TocTitle>
            <TocList>
                {headings.map((heading, index) => (
                    <TocItem key={index} level={heading.level}>
                        <a href={`#${heading.id}`}>{heading.text}</a>
                    </TocItem>
                ))}
            </TocList>
        </TocContainer>
    );
};