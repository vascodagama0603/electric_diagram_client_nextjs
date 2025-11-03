import { PageLayout } from '../components/LayoutComponents';
import { StyledContentContainer } from '../components/ContentStyles';
import ClientTagFilterWithData from '../components/ClientTagFilterWithData'; 
import React, { Suspense } from 'react';
import { Metadata } from 'next';
export const metadata: Metadata = {
    // 💡 ブログ一覧ページにふさわしいタイトルを設定
    title: '技術ブログ一覧 | 電気設計、制御、CADの専門知識', 
    
    // 💡 検索エンジンのスニペットに表示されるディスクリプション
    description: '電気設計、シーケンス制御、CAD操作に関する実践的な技術記事一覧です。初心者からベテランまで役立つ情報を発信しています。',
    
    // 💡 キーワードを追加（必要に応じて）
    keywords: ['電気設計ブログ', '制御技術', 'CAD', 'シーケンス制御', '技術記事'],
    
    openGraph: {
        title: '技術ブログ一覧 | 電気設計、制御、CADの専門知識',
        url: 'https://denkizumen.com/blog', // サイトのドメインに合わせて修正
    }
};
export default async function BlogPage() {
    
    return (
        <PageLayout>
            <StyledContentContainer>
                <Suspense fallback={<div>ブログ一覧をロード中...</div>}>
                    <ClientTagFilterWithData />
                </Suspense>
            </StyledContentContainer>
        </PageLayout>
    );
}