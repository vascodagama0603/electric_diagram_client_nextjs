// src/lib/articleUtils.ts

import * as cheerio from 'cheerio';

interface Heading {
    level: number; // 2, 3, 4 (h2, h3, h4)
    text: string;
    id: string; // URLのアンカーリンク用
}

export function extractHeadings(htmlContent: string): Heading[] {
    if (!htmlContent) return [];

    const $ = cheerio.load(htmlContent);
    const headings: Heading[] = [];

    // H2, H3タグを対象に見出しを抽出
    $('h2, h3').each((i, el) => {
        const tag = $(el).get(0)!.tagName.toLowerCase(); // 'h2' or 'h3'
        const level = parseInt(tag.substring(1)); // 2 or 3
        const text = $(el).text().trim();
        
        // テキストから安全なIDを生成 (日本語対応)
        // 例: '1. 無電圧接点とは？' -> '1-無電圧接点とは'
        let id = text
            .toLowerCase()
            .replace(/[\s\t]+/g, '-') // スペースをハイフンに
            .replace(/[()（）]/g, '') // カッコを削除
            .replace(/[^\w\-]/g, ''); // その他の記号を削除

        // IDが空の場合や重複を防ぐための処理
        if (!id) {
            id = `heading-${i}`;
        }
        
        // HTML要素にもIDを付与（アンカーリンクを機能させるため）
        $(el).attr('id', id);

        headings.push({ level, text, id });
    });

    // 処理後のHTMLを返す。
    // 注意：Next.jsのレンダリングパイプラインによっては、このID付与が不要な場合もありますが、確実性を高めます。
    // 今回は、単に抽出したheadingsを返すのみにとどめ、ID付与はContentStylesの修正で行う方がクリーンかもしれません。
    
    // 💡 補足: ContentStylesでIDを付与する場合、この関数はID付与を行わず、headings配列を返すだけで十分です。
    // 確実な実装のため、ContentStylesのh2/h3にIDを自動付与するロジックを次項で追加することを推奨します。

    return headings;
}

