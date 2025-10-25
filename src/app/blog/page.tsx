import { PageLayout } from '../components/LayoutComponents';
import { StyledContentContainer } from '../components/ContentStyles';
// 💡 修正: ClientTagFilterWithData ラッパーをインポート
import ClientTagFilterWithData from '../components/ClientTagFilterWithData'; 

// 💡 修正: searchParams 引数を削除し、純粋なサーバーコンポーネントにする
export default async function BlogPage() {
    
    return (
        <PageLayout>
            <StyledContentContainer>
                {/* 💡 データ取得とフィルターロジックを ClientTagFilterWithData に委譲 */}
                <ClientTagFilterWithData />
            </StyledContentContainer>
        </PageLayout>
    );
}