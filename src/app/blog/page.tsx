// src/app/blog/page.tsx (サーバーコンポーネント)

import { getBlogArticles } from '../../lib/microCmsClient';
import ClientTagFilter from '../components/ClientTagFilter';
import { PageLayout } from '../components/LayoutComponents';
import { StyledContentContainer } from '../components/ContentStyles';

// 💡 修正: searchParamsを受け取る
export default async function BlogPage({ searchParams }: { 
    searchParams: { tag?: string } 
}) {
    // 1. URLから 'tag' クエリパラメータを取得
    const tagQuery = searchParams.tag || null;
    
    // 2. クエリパラメータを使って記事を取得
    //    tagQuery が null の場合は全件取得されます
    const allArticles = await getBlogArticles(tagQuery); 

    return (
        <PageLayout>
            <StyledContentContainer>
                {/* 3. ClientTagFilter には全件ではなく、取得した記事を渡す */}
                {/* これにより、URLクエリに応じた初期表示が可能になる */}
                <ClientTagFilter 
                    initialArticles={allArticles}
                    // 💡 追加: 現在のフィルター状態を ClientTagFilter に渡す
                    initialSelectedTag={tagQuery} 
                />
            </StyledContentContainer>
        </PageLayout>
    );
}