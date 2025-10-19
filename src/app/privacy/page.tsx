// app/privacy/page.tsx

import { PageLayout } from '../components/LayoutComponents'; 
import { StyledContentContainer } from '../components/ContentStyles';

export default function PrivacyPolicyPage() {
    return (
        <PageLayout>
            <StyledContentContainer>
                <h2>プライバシーポリシー</h2>
                <p>
                    当サイト（電気回路図シンボルライブラリ）は、以下のとおり個人情報保護方針を定め、個人情報保護の仕組みを構築し、個人情報の保護を推進致します。
                </p>

                <h3>**1. Google AdSenseについて**</h3>
                <p>
                    当サイトでは、第三者配信の広告サービス「**Google AdSense**」を利用しています。
                </p>
                <p>
                    Google AdSenseでは、広告配信プロセスにおいて、ユーザーの興味に応じた商品やサービスの広告を表示するため、当サイトや他サイトへのアクセスに関する情報**『Cookie（クッキー）』**を使用することがあります。
                </p>
                <p>
                    ただし、Cookieには氏名、住所、メールアドレス、電話番号などの個人を特定できる情報は含まれません。
                </p>
                <p>
                    また、お客様は、<a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Googleアカウントの広告設定ページ</a>で、パーソナライズ広告を無効にすることができます。
                </p>

                <h3>**2. アクセス解析ツールについて**</h3>
                <p>
                    当サイトでは、Googleによるアクセス解析ツール「Google Analytics」を利用しています。このGoogle Analyticsはトラフィックデータの収集のためにCookieを使用しています。このトラフィックデータは匿名で収集されており、個人を特定するものではありません。この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。
                </p>

                <h3>**3. 免責事項**</h3>
                <p>
                    当サイトで提供するCADデータや情報については、その正確性や安全性を保証するものではありません。当サイトのコンテンツや情報によって、いかなる損害・損失が発生した場合も、当サイトは一切の責任を負いかねます。
                </p>
                <h3>**4. 著作権**</h3>
                <p>
                    当サイトの記事、画像、CADデータ、その他のコンテンツの著作権は、当サイト管理者に帰属します。
                </p>
                <p>
                    当サイトが提供するCADデータ（DXF, SVG形式）は、**電気図面作成目的でのみ**、自由に利用、および加工・改変を許可します。しかし、**再配布や販売は固く禁止**します。
                </p>
                
                {/* --- 強化項目 6: 運営者情報 --- */}
                <h3 style={{ marginTop: '40px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
                    **5. 運営者情報**
                </h3>
                <p>
                    運営者名: miyake
                    <br />
                    連絡先: contact@denkizumen.com
                </p>
            </StyledContentContainer>
        </PageLayout>
    );
}