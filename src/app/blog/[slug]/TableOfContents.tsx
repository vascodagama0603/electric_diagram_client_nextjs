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
    /* 💡 全体を囲むボックスをモダンなデザインに */
    border: 1px solid #e9ecef;
    border-radius: 8px; /* 角丸を少し大きく */
    padding: 20px; /* パディングを増やす */
    margin: 30px 0; /* 上下の余白を確保 */
    background-color: #ffffff; /* 白い背景 */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); /* 影を追加して浮き上がらせる */
`;

const TocTitle = styled.h4`
    /* 💡 タイトルを強調 */
    font-size: 1.2em; /* 少し大きく */
    font-weight: 700;
    color: #212529; /* 濃い色 */
    margin-top: 0;
    margin-bottom: 15px; /* 下に余白 */
    padding-bottom: 8px;
    border-bottom: 3px solid #007bff; /* メインカラーの太い下線 */
    line-height: 1.4;
`;

const TocList = styled.ul`
    list-style: none;
    padding-left: 0;
    margin-bottom: 0;
`;

const TocItem = styled.li<{ level: number }>`
    /* 💡 リストアイテムのデザイン */
    margin-bottom: 8px; /* 間隔を少し広げる */
    font-size: 0.95em;
    transition: background-color 0.2s; /* ホバー時のトランジション */

    /* H3 はインデントを適用 */
    padding-left: ${({ level }) => (level === 3 ? '20px' : '0')}; 
    position: relative;
    
    /* 💡 モダンなリストマーカー */
    &::before {
        content: '${({ level }) => (level === 2 ? '▶' : '・')}'; /* H2/H3でマーカーを区別 */
        color: ${({ level }) => (level === 2 ? '#007bff' : '#6c757d')}; /* H2にメインカラー */
        font-size: ${({ level }) => (level === 2 ? '0.7em' : '1em')};
        margin-right: 8px;
        position: absolute;
        left: ${({ level }) => (level === 3 ? '0' : '-10px')};
        top: 3px;
    }

    a {
        color: #333;
        text-decoration: none;
        display: block;
        padding: 2px 0;
        
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