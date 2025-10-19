// lib/microCmsClient.tsx

import * as cheerio from 'cheerio';
import { createClient, MicroCMSListResponse, MicroCMSListContent } from 'microcms-js-sdk';

interface ArticleItem {
    slug: string;
    title: string;
    summary: string;
    date: string;
    image: string;
    tag: string[]; // タグは文字列の配列
}
interface BlogContent extends MicroCMSListContent {
    title: string;
    summary: string;
    publishedAt: string;
    slug: string;
    image?: { url: string }; // imageはオプショナルなオブジェクトと仮定
    tag: string[]; // microCMSのtagフィールド名に合わせる
}
interface ArticleDetail {
    id: string;
    title: string;
    publishedAt: string;
    body: string;
    slug: string;
    tag: string[]; // タグは文字列の配列
}

const serviceId = process.env.NEXT_PUBLIC_MICROCMS_SERVICE_ID;
const apiKey = process.env.NEXT_PUBLIC_MICROCMS_API_KEY;

if (!serviceId || !apiKey) {
    throw new Error("microCMSの環境変数が設定されていません。");
}

export const client = createClient({
  serviceDomain: serviceId,
  apiKey: apiKey,
});

export async function getBlogArticles(tag: string | null) {
  try {
      const queries: { limit: number, fields: string, filters?: string } = {
      limit: 100,
      fields: 'id,title,summary,publishedAt,slug,tag,image',
     };
    
    if (tag && tag.length > 0) {
        queries.filters = `tag[contains]${tag}`;
    }
    
    const response: MicroCMSListResponse<BlogContent> = await client.get({
      endpoint: 'blogs', 
      queries: queries,
    });

    return response.contents.map((item) => ({
      slug: item.id, 
      title: item.title,
      summary: item.summary,
      date: item.publishedAt,
      image: item.image?.url || '/default-blog-image.jpg',
      tag: item.tag || [],
      
    }));
    
  } catch (error) {
    console.error("記事取得に失敗しました:", error);
    return [];
  }
  
}

export async function getBlogArticleBySlug(slug: string) {
  try {
    const response = await client.get({
      endpoint: 'blogs',
      contentId: slug,   // 💡 ここが単一記事取得のキモ
      queries: {
        fields: 'id,title,publishedAt,body,slug,tag', // 必要なフィールドを明記
      },
    });
    const processedBody = processTableHtml(response.body);
    return {
        id: response.id,
        title: response.title,
        publishedAt: response.publishedAt,
        body: processedBody,
        slug: response.slug,
        tag: response.tag || [], 
    } as ArticleDetail;

  } catch (error) {
    console.error(`Error fetching article by slug (${slug}):`, error);
    return null; 
  }
}

function processTableHtml(htmlContent: string): string {
    if (!htmlContent) return '';

    const $ = cheerio.load(htmlContent);
    
    $('table').each((i, table) => {
        const $table = $(table);
        const headers: string[] = [];
        
        // 1. ヘッダー (<th>) のテキストを取得
        $table.find('thead th').each((j, th) => {
            headers.push($(th).text().trim()); 
        });

        // 2. 各行 (<tr>) のセル (<td>) に data-label 属性を設定
        if (headers.length > 0) {
            $table.find('tbody tr').each((k, tr) => {
                $(tr).find('td').each((l, td) => {
                    if (headers[l]) {
                        $(td).attr('data-label', headers[l]);
                    }
                });
            });
        }
    });

    return $.html();
}