// src/styles/GeneralStyles.js
"use client";
import styled from "@emotion/styled";

import { Box } from "@mui/material";
// --- ページ共通スタイル (About, Privacy, Contactなどで使用) ---

export const SectionTitle = styled.h3`
    color: #34495e; /* 濃いめのグレーで統一感を持たせる */
    border-bottom: 2px solid #ccc;
    padding-bottom: 5px;
    margin-top: 30px;
    margin-bottom: 15px;
`;

// 運営者情報/著作権の警告文専用のスタイル
export const CopyrightWarning = styled.p`
    color: #e74c3c; /* 警告を意味する赤色 */
    font-weight: 700;
    font-size: 1.1em;
    padding: 15px;
    border: 2px solid #e74c3c;
    border-radius: 6px;
    background-color: #fcecec; 
    margin-top: 20px;
    line-height: 1.5;
`;

// --- お問い合わせページ (Contact) スタイル ---
export const CenteredContent = styled.div`
    text-align: center;
    max-width: 700px;
    margin: 0 auto;
`;

export const MailActionArea = styled.div`
    margin-top: 30px;
    margin-bottom: 20px;
`;

export const MailLink = styled.span` // 💡 styled.a から styled.span に変更
    display: block;
    font-size: 1.2rem;
    font-weight: bold;
    word-break: break-all;
    color: #007bff;
    text-decoration: underline;
    cursor: pointer;
    margin-bottom: 15px;

    &:hover { color: #0056b3; }
`;

export const CopyButton = styled.button`
    padding: 8px 20px;
    background-color: #6c757d; 
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background-color 0.2s;
    &:hover { background-color: #5a6268; }
`;

export const Message = styled.div`
    color: ${props => props.color === 'error' ? 'red' : 'green'};
    margin-top: 10px;
    font-size: 0.9rem;
`;

// --- BlogCatalog スタイル ---
// ⚠️ BlogCatalog内のすべてのスタイル定義をここに移動

export const BlogPageTitle = styled.h2`
    font-size: 2rem;
    color: #333;
    margin: 10px 0 30px 0;
    border-bottom: 3px solid #e74c3c; /* ブログ用のアクセントカラー */
    padding-bottom: 5px;
`;

export const BlogContainer = styled.div`
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    gap: 30px;
`;

export const BlogArticleCard = styled.div`
    display: flex;
    background-color: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    text-decoration: none;
    color: inherit;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    
    &:hover {
        box-shadow: 0 8px 20px rgba(231, 76, 60, 0.2); /* ホバー時の影を赤系に */
        transform: translateY(-5px);
        border-color: #e74c3c; /* ホバーで赤系に */
    }

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;
export const ArticleImage = styled.img`
    width: 200px; /* 画像の幅 */
    height: 100%;
    object-fit: cover; 
    flex-shrink: 0; 
    border-right: 1px solid #eee; /* カードデザインとして線を残す */

    @media (max-width: 768px) {
        width: 100%; /* 親要素の幅いっぱいに広げる */
        height: 200px; /* モバイルでの高さを固定 */
        flex-shrink: 1;
    }
`;
export const ArticleContent = styled.div`
    padding: 20px;
    flex-grow: 1;

    /* 🚨 修正ポイント：モバイルでのパディングを調整 */
    @media (max-width: 768px) {
        padding: 15px; /* パディングを少し減らす */
    }
`;

export const ArticleTitle = styled.h3`
    font-size: 1.4rem;
    margin: 0 0 10px 0;
    font-weight: 700;
    text-decoration: none; 
    color: #333;
`;

export const ArticleSummary = styled.p`
    font-size: 1rem;
    color: #555;
    line-height: 1.6;
    margin-bottom: 15px;
`;

export const ArticleMeta = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.85rem;
    color: #888;
    border-top: 1px dashed #eee;
    padding-top: 10px;
`;

export const TagList = styled.div`
    display: flex;
    gap: 8px;
`;

export const Tag = styled.span`
    background-color: #fcecec; 
    color: #e74c3c; /* 赤系のアクセント */
    padding: 4px 8px;
    border-radius: 4px;
    font-weight: 600;
    font-size: 0.8rem;
`;

export const StatusMessage = styled.div`
    text-align: center;
    padding: 50px;
    font-size: 1.2rem;
`;
// ... (Tag, StatusMessageなどBlogCatalogの全スタイルをここに移動)



// 1. オーバーレイ (画面全体を覆う半透明の背景)
export const StyledOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7); /* 黒の半透明 */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000; /* 最前面に表示 */
`;

// 2. モーダル本体
export const StyledDescriptionBox = styled.div`
    position: relative;
    width: 90%;
    max-width: 700px;
    padding: 30px;
    border-radius: 12px;
    background-color: #ffffff; /* 白の背景 */
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    /* 軽くアニメーション */
    transform: scale(1);
    transition: transform 0.3s ease-out;
`;

// 3. 閉じるボタン
export const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    cursor: pointer;
    color: #a0a0a0;
    padding: 5px;

    &:hover {
        color: #e74c3c; /* ホバーで赤く */
    }
`;

export const DescriptionTitle = styled.h3`
    font-size: 1.5rem;
    color: #0056b3;
    border-bottom: 2px solid #007bff;
    padding-bottom: 5px;
    margin-top: 0;
    margin-bottom: 15px;
`;

export const DescriptionContent = styled.p`
    font-size: 1rem;
    line-height: 1.7;
    color: #333;
    text-align: justify;
`;
export const StyledComment = styled.p`
  font-size: 0.5rem;
  color: #777; /* 薄い色でサブ情報として強調 */
  margin: 4px auto 10px;
`;

export const StyledSubComment = styled.p`
  font-size: 0.5rem;
  font-weight: 600; /* 太字にして目立たせる */
  color: #333; /* 濃いめの色 */
  margin: 5px auto 0px;
`;

export const StyledImageArea = styled.div`
  /* 既存のレイアウトはそのままに、上下にゆとりを持たせる */
  margin: 2em auto; 
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0 10px; /* 画面端に余裕を持たせる */
`;

export const StyledImage = styled.img`

  object-fit: contain;
  margin: 10px;

  max-width: 100px;
  height: 100px;
`;

export const StyledOnImageButton = styled.div`
  cursor: pointer;
  position: absolute;
  bottom: 5px;
  right: 5px;
  color: #fff;
  
`;

export const SvgButton = styled.button`
  font-size: 0.8rem;
  width: 30px;
  height: 30px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  background: skyblue;
  border: 2px solid skyblue;
  &:hover {
    background: #fff;
  color: skyblue;
  }
`;

export const DxfButton = styled(SvgButton)`
  background: orange;
  border: 2px solid orange;
  &:hover {
    background: #fff;
    color: orange;
  }
  margin-top:5px;
`;

export const SignalBox = styled(Box)`
  /* カードとしての視覚的改善 */
  background-color: #ffffff; /* 背景を白に設定 */
  border: 1px solid #e0e0e0; /* 薄い境界線 */
  border-radius: 6px; /* 角を丸く */
  padding: 10px;
  margin: 5px; /* カード間のスペースを広げる */
  width: 130px; /* 最大幅を固定して整列しやすく */
  text-align: center;
  
  /* アニメーションの追加 */
  transition: all 0.3s ease-in-out;
  
  &:hover {
    box-shadow: 0px 8px 16px rgba(0, 40, 80, 0.1); /* ホバーでより立体的な影 */
    transform: translateY(-7px); /* 持ち上がる効果 */
    border-color: #007bff; /* ホバーで主要な色に */
  }
`;

export const PageTitle = styled.h2`
    font-size: 2rem;
    color: #333;
    margin: 10px 0 20px 0; /* マージンを調整 */
    border-bottom: 3px solid #007bff;
    padding-bottom: 5px;
`;
export const NotFoundMessage = styled.div`
    width: 100%;
    text-align: center;
    padding: 50px 0;
    font-size: 1.2rem;
    color: #6c757d; /* グレー系の色 */
    background-color: #f8f9fa; /* 薄い背景色 */
    border-radius: 8px;
    margin-top: 20px;
    /* サイドバーとのスペースを調整するため、幅を親要素に合わせる */
    max-width: 95%; 
    margin: 30px auto; 
`;

export const SearchInput = styled.input`
    width: 100%;
    padding: 12px 20px;
    margin-bottom: 25px;
    border: 2px solid #ccc;
    border-radius: 8px;
    font-size: 1.1rem;
    outline: none;
    transition: border-color 0.3s;
    box-sizing: border-box; 

    &:focus {
        border-color: #007bff; /* フォーカス時に青く強調 */
    }
`;

export const StyledStatusContainer = styled.div`
  /* 絶対配置で親要素（SignalBox）全体を覆う */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  
  /* 半透明の背景 */
  background: rgba(255, 255, 255, 0.9);
  
  /* コンテンツを中央に配置 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  /* その他のコンテンツより手前に表示 */
  z-index: 10;
  
  /* スムーズな表示/非表示のためのトランジション */
  opacity: 1;
  transition: opacity 0.3s ease-in-out;
  border-radius: 12px; /* SignalBoxの角丸と合わせる */
`;

// 2. ローディングスピナー (アニメーション)
export const Spinner = styled.div`
  border: 5px solid #f3f3f3; /* Light grey */
  border-top: 5px solid #007bff; /* Primary Blue */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite; /* 1秒で無限に回転 */
  margin-bottom: 10px;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// 3. ステータスを示すテキスト
export const StatusText = styled.div`
  color: #007bff;
  font-size: 0.9rem;
  font-weight: 600;
`;



