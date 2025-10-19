// /app/blog/page.tsx

import { PageLayout } from '../components/LayoutComponents'; 
import { BlogCatalog } from '../components/BlogCatalog';
import { getBlogArticles } from '../../lib/microCmsClient';
export default async function BlogPage() {
    const articles = await getBlogArticles(null);
    return (
        // 💡 修正3: PageLayout で全体をラップ
        <PageLayout>
            <h1>ブログ記事一覧</h1>
            {/* 💡 修正: 取得した記事を BlogCatalog に渡す */}
            {articles && articles.length > 0 ? (
                <BlogCatalog initialArticles={articles} />
            ) : (
                <p>現在、公開されている記事はありません。</p>
            )}
        </PageLayout>
    );
}