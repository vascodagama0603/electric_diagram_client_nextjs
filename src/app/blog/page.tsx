import { PageLayout } from '../components/LayoutComponents'; 
import { getBlogArticles } from '../../lib/microCmsClient';
import ClientTagFilter from '../components/ClientTagFilter'; 

export default async function BlogList() {
    const allArticles = await getBlogArticles(null);

    return (
        <PageLayout>
            <h1>ブログ記事一覧</h1>
            <ClientTagFilter initialArticles={allArticles} />
            
        </PageLayout>
    );
}