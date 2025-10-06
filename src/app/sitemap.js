// app/sitemap.js

// ★ 修正点: このファイルを静的に扱うようNext.jsに明示的に指示
export const dynamic = 'force-static'; 

// サイトのベースURLを正確に設定してください
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://denkizumen.com'; 

export default async function sitemap() {
  const routes = [
    // サイトのトップページ
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly', // 頻繁に更新する場合は 'daily' に変更
      priority: 1.0, // 最も重要なので1.0
    },
    // プライバシーポリシーページ
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    // お問い合わせページ
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    // 運営者情報ページ
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    // 将来的にシンボルカタログのサブページなどがあればここに追加
    // 例: { url: `${baseUrl}/category/a-contact`, ... } 
  ];

  return routes;
}