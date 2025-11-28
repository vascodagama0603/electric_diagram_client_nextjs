// src/app/blog/[slug]/ArticleClient.tsx
"use client";
import React from 'react';
import { ArticleBody } from '../../../styles/GeneralStyles';
import {ArticleBodyProps} from '../../../lib/type'

export const ArticleContent: React.FC<ArticleBodyProps> = ({ htmlContent }) => {
    return (
        <ArticleBody>
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </ArticleBody>
    );
};