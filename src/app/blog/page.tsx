import { PageLayout } from '../components/LayoutComponents'; 
import { getBlogArticles } from '../../lib/microCmsClient';
// 💡 修正: クライアントコンポーネントをインポート
import ClientTagFilter from '../components/ClientTagFilter'; 

export default async function BlogList() {
    
    // サーバーで全ての記事データを取得
    // tagName: null は全記事取得を意味します
    const allArticles = await getBlogArticles(null);

    return (
        <PageLayout>
            <h1>ブログ記事一覧</h1>
            
            {/* 💡 修正: 全ての記事データをクライアントコンポーネントに渡す */}
            <ClientTagFilter initialArticles={allArticles} />
            
        </PageLayout>
    );
}