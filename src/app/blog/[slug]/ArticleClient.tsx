// src/app/blog/[slug]/ArticleClient.tsx

"use client"; // 💡 クライアントコンポーネント化

import styled from "@emotion/styled";
import React from 'react';

// ------------------------------------
// 1. スタイルコンポーネント
// ------------------------------------

// Propsの型を定義
interface ArticleBodyProps {
    htmlContent: string;
}

// 記事の内容を表示するためのスタイル
const ArticleBody = styled.div`
    line-height: 1.8;

    /* 🚨 修正ポイント: 画像に関するCSSを追加 */
    img {
        /* 親要素の幅を超えないように最大幅を100%に設定 */
        max-width: 100%; 
        /* 画像の比率を維持したまま、はみ出しを防ぐ */
        height: auto; 
        /* 画像の下に不要なスペースが入るのを防ぐため */
        display: block; 
        /* 記事本文内で画像が連続する場合の余白 */
        margin: 20px 0; 
        /* 角を丸めるなど、デザインを統一しても良いでしょう */
        border-radius: 8px; 
        box-shadow: 0 2px 5px rgba(0,0,0,0.1); /* 軽めの影 */
    }
    line-height: 1.8;
    
    // microCMSから取得したHTMLに適用するスタイル
    h1, h2, h3, h4 { margin-top: 2em; margin-bottom: 0.8em; }
    h1 { font-size: 1.8rem; }
    h2 { font-size: 1.6rem; border-left: 5px solid #007bff; padding-left: 10px; }
    h3 { font-size: 1.4rem; }
    
    p { margin-bottom: 1.5em; }
    
    // リスト
    ul, ol { 
        margin-left: 1.5em; 
        padding-left: 0;
        margin-bottom: 1.5em; 
    }
    
    // コードブロック
    pre {
        background-color: #f4f4f4;
        padding: 15px;
        border-radius: 5px;
        overflow-x: auto;
        font-family: 'Consolas', 'Courier New', monospace;
    }
`;

// ------------------------------------
// 2. クライアントコンポーネント
// ------------------------------------

// 記事本文の表示を担当するコンポーネント
export const ArticleContent: React.FC<ArticleBodyProps> = ({ htmlContent }) => {
    return (
        <ArticleBody>
            {/* microCMSから取得したHTMLをそのまま表示 */}
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </ArticleBody>
    );
};