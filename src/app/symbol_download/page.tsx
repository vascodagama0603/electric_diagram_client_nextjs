// app/page.tsx
import { PageLayout } from '../components/LayoutComponents';
import {SymbolCatalog} from '../components/SymbolCatalog'
import { StyledContentContainer } from '../../styles/GeneralStyles';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "CAD用 電気シンボル DXF/SVG 無料ダウンロード",
  description: "電気図面作成に必要なJIS規格の電気シンボルを提供します。a接点、遮断器、押しボタンなど",
  openGraph: {
      title: 'CAD用 電気シンボル DXF/SVG 無料ダウンロード',
      url: 'https://denkizumen.com/symbol_download',
  }
};


export default function Home() {
  return (
    <>
        <PageLayout>
          <StyledContentContainer>
            <SymbolCatalog />
          </StyledContentContainer>
        <p style={{textAlign: 'center', margin: '20px 0'}}>JISC0617をもとにシンボルを制作しています</p>
        </PageLayout>
    </>
  );
}