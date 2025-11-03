// lib/microCmsClient.tsx

import * as cheerio from 'cheerio';
import { createClient, MicroCMSListResponse, MicroCMSListContent } from 'microcms-js-sdk';

export interface ArticleItem {
    slug: string;
    title: string;
    summary: string;
    date: string;
    image: string;
    tag: string[]; 
}
interface BlogContent extends MicroCMSListContent {
    title: string;
    summary: string;
    publishedAt: string;
    slug: string;
    image?: { url: string }; 
    tag: string[]; 
}
interface ArticleDetail {
    id: string;
    title: string;
    publishedAt: string;
    body: string;
    slug: string;
    tag: string[]; 
    description:string;
    keyword:string;
}
const getClient = () => {
  const serviceId = process.env.NEXT_PUBLIC_MICROCMS_SERVICE_ID;
  const apiKey = process.env.NEXT_PUBLIC_MICROCMS_API_KEY;

    if (!serviceId || !apiKey) {
        console.warn("microCMS環境変数が設定されていません。...");
        return {
            get: async () => ({ contents: [], totalCount: 0, limit: 0, offset: 0 }),
        };
    }
    return createClient({
        serviceDomain: serviceId as string, // ⬅️ 型アサーション
        apiKey: apiKey as string,           // ⬅️ 型アサーション
    });
};
export const getBlogArticles = async (tag: string | null): Promise<ArticleItem[]> => {
    
    try {
      const client = getClient();
      if (!client) {
          return [];
      }
      const queries: { limit: number, fields: string, filters?: string } = {
      limit: 100,
      fields: 'id,title,summary,publishedAt,slug,tag,image',
     };
    const trimmedTag = tag ? tag.trim() : null;
  if (trimmedTag && trimmedTag.length > 0) { 
        queries.filters = `tag[contains]${trimmedTag}`; // ⬅️ 確実に値が存在する場合のみ適用
    }
    
    const response: MicroCMSListResponse<BlogContent> = await client.get({
      endpoint: 'blogs', 
      queries: queries,
    });

    return response.contents.map((item) => ({
      slug: item.slug || item.id,
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

export async function getBlogArticleBySlug(slug: string): Promise<ArticleDetail | null> {
  try {
    const client = getClient();
    if (!client || typeof client.get !== 'function') {
         return null; 
    }
    const response = await client.get({
      endpoint: 'blogs',
      contentId: slug,   
      queries: {
        fields: 'id,title,publishedAt,body,slug,tag,summary,keywords',
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
        description: response.summary, 
        keyword: response.keywords, 
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
        
        $table.find('thead th').each((j, th) => {
            headers.push($(th).text().trim()); 
        });

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