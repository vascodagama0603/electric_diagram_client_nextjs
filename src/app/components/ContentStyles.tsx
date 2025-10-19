// app/components/ContentStyles.tsx
"use client";
import styled from "@emotion/styled";

export const GlobalLayoutContainer = styled.div`
    flex-direction: column;
    min-height: 100vh;
`;
export const MainContentWrapper = styled.main`
    flex-grow: 1;
    padding: 20px; /* 全体の余白 */

    /* 🚨 修正ポイント: max-width を設定する場合は width: 100% と併用する */
    width: 100%; 
    max-width: 1400px; /* サイト全体の最大幅を制限したい場合 */
    margin: 0 auto;
`;

export const StyledContentContainer = styled.div`
    padding: 30px;
    max-width: 900px;
    margin: 0 auto;
    line-height: 1.8;
    
    h2 {
        font-size: 2rem;
        border-bottom: 3px solid #007bff;
        padding-bottom: 5px;
        margin-top: 0;
        margin-bottom: 25px;
    }

    h3 {
        font-size: 1.4rem;
        margin-top: 40px;
        margin-bottom: 15px;
    }

    p {
        margin-bottom: 15px;
    }
table {
        width: 100%; /* 親要素の幅いっぱいに広げる */
        border-collapse: collapse;
        margin: 25px 0;
        font-size: 0.9em;
        /* min-width: 400px; は削除または維持 */
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
        border-radius: 8px;
        overflow: hidden; /* 角丸を適用するために必要 */
        background-color: #ffffff;
    }
    }

    th, td {
        padding: 12px 15px; /* セルのパディング */
        text-align: left; /* テキストを左寄せ */
        border-bottom: 1px solid #dddddd; /* 下線 */
    }

    th {
        background-color: #007bff; /* ヘッダーの背景色 */
        color: #ffffff; /* ヘッダーの文字色 */
        font-weight: bold;
        text-transform: uppercase; /* 大文字にする */
    }

    tr:nth-of-type(even) {
        background-color: #f3f3f3; /* 偶数行の背景色（ストライプ効果） */
    }

    tr:hover {
        background-color: #e6f7ff; /* ホバー時の背景色 */
        cursor: pointer;
    }

    /* 最後の行の下線をなくす */
    tr:last-of-type {
        td {
            border-bottom: none;
        }
    }

    /* 💡 レスポンシブ対応: 小さい画面ではテーブルが横スクロール */
    @media (max-width: 768px) {
        /* 💡 768px以下の画面では、テーブル全体をスクロール可能なコンテナで包む */
        & table {
            /* widthを固定値にすることで、コンテナの幅を超えて横スクロール可能にする */
            width: 700px; /* テーブルが崩れない最小限の幅を設定 */
            display: block;
        }

        /* テーブル全体を横スクロール可能にするコンテナ */
        /* StyledContentContainerの子要素のテーブルをラップするために、
           <div style={{overflowX: 'auto'}}>...</div> でテーブルを囲むのが理想ですが、
           それができないため、StyledContentContainerの直下の<table>を処理します。 */

        /* 💡 暫定策として、テーブルの親要素 (StyledContentContainer) に
              横スクロールを適用しますが、これは他のコンテンツに影響を与える可能性があるため、
              可能であればテーブルを <div> で囲んでください。 */

        /* ⚠️ もしテーブルが <div style={{overflowX: 'auto'}}> で囲われていなければ、
              以下のCSSを適用しても、親要素の <StyledContentContainer> がはみ出します。
              （このCSSは tables.css の一般的なモバイル対応パターンです） */

        /* テーブルをモバイル表示で強制的に縦並びにするコードは削除し、
           横スクロールに統一します。 */
    }
`;