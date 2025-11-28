// app/about/page.tsx
import { PageLayout } from '../components/LayoutComponents';
import { CopyrightWarning,SectionTitle,StyledContentContainer } from '../../styles/GeneralStyles'; 

export default function AboutPage() {
    return (
        <PageLayout>
            <StyledContentContainer>
                <h2>運営者情報・コンセプト</h2>
                
                <SectionTitle>サイト運営者</SectionTitle>
                <p>
                    運営者名: miyake
                    <br />
                    （電気設備設計歴10年）
                </p>
                
                <h3>サイト開設の目的</h3>
                <p>
                    電気設計に携わる皆様の業務効率化を目的として、JIS規格に基づいた高品質なCADシンボルを無料で提供するために開設しました。
                </p>
                <p>
                    このライブラリが、皆様の図面作成の一助となれば幸いです。
                </p>

                <h3>著作権について</h3>
                <p>
                    当サイトで配布しているシンボルデータは、JISC0617の規格を参考に、当サイト運営者が独自に作成したものです。著作権は当サイトに帰属します。
                </p>
                <CopyrightWarning>
                    **【重要】再配布・販売は禁止です。業務での利用のみに限定させていただきます。**
                </CopyrightWarning>
            </StyledContentContainer>
        </PageLayout>
    );
}