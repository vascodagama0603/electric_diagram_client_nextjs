// src/lib/articleUtils.ts

import * as cheerio from 'cheerio';

interface Heading {
    level: number; 
    text: string;
    id: string; 
}

export function extractHeadings(htmlContent: string): Heading[] {
    if (!htmlContent) return [];

    const $ = cheerio.load(htmlContent);
    const headings: Heading[] = [];


    $('h1, h2, h3').each((i, el) => {
        const tag = $(el).get(0)!.tagName.toLowerCase(); 
        const level = parseInt(tag.substring(1));
        const text = $(el).text().trim();

        let id = text
            .toLowerCase()
            .replace(/[\s\t]+/g, '-') // スペースをハイフンに
            .replace(/[()（）]/g, '') // カッコを削除
            .replace(/[^\w\-]/g, ''); // その他の記号を削除

        if (!id) {
            id = `heading-${i}`;
        }

        $(el).attr('id', id);

        headings.push({ level, text, id });
    });


    return headings;
}

