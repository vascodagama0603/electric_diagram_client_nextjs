// src/app/blog/[slug]/TableOfContents.tsx

"use client";

import React from 'react';
import styled from "@emotion/styled";

interface Heading {
    level: number;
    text: string;
    id: string;
}

interface TableOfContentsProps {
    headings: Heading[];
}
const TocContainer = styled.div`
    border: 1px solid #e9ecef;
    border-radius: 6px; /* 角丸を小さく */
    padding: 15px; /* パディングを減らす */
    margin: 25px 0;
    background-color: #ffffff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.03); /* 影を控えめに */
`;

const TocTitle = styled.h4`
    /* 💡 タイトルをコンパクトに */
    font-size: 1.05em; /* フォントサイズを小さく */
    font-weight: 700;
    color: #212529;
    margin-top: 0;
    margin-bottom: 10px; /* 余白を減らす */
    padding-bottom: 5px;
    border-bottom: 2px solid #007bff; /* 下線も少し細く */
`;

const TocList = styled.ul`
    list-style: none;
    padding-left: 0;
    margin-bottom: 0;
`;

const TocItem = styled.li<{ level: number }>`
/* 💡 リストアイテムを詰める */
    margin-bottom: 1px;
    font-size: 0.7rem; /* フォントサイズを小さく */
    transition: background-color 0.2s; 

    /* H1, H2, H3のインデントを調整 */
    padding-left: ${({ level }) => {
        if (level === 2) return '15px'; // H2は少しインデント
        if (level === 3) return '30px'; // H3はさらにインデント
        return '0'; // H1
    }};
    position: relative;
    
    /* 💡 マーカーの調整 */
    &::before {
        content: '${({ level }) => {
            if (level === 2) return '▶';
            if (level === 3) return '・';
            return '■'; // H1には新しいマーカー
        }}'; 
        color: ${({ level }) => (level === 1 ? '#007bff' : (level === 2 ? '#007bff' : '#6c757d'))};
        font-size: ${({ level }) => (level === 1 ? '0.8em' : '0.7em')}; /* H1マーカーを少し大きく */
        margin-right: 8px;
        position: absolute;
        
        /* H1は左端に配置、H2, H3はインデントの分だけ右に移動 */
        left: ${({ level }) => {
            if (level === 2) return '0';
            if (level === 3) return '15px';
            return '-10px'; // H1はコンテナの左端に寄せる
        }};
        top: 3px;
    }

    a {
        color: #333;
        text-decoration: none;
        display: block;
        padding: 0;
        
        &:hover {
            color: #007bff;
            /* 下線はホバー時のみ表示するか、完全に削除する方がモダンです */
            /* text-decoration: underline; */
        }
    }
`;
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