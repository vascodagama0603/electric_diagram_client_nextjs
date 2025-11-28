// app/page.tsx
import { PageLayout } from '../components/LayoutComponents';
import {SymbolCatalog} from '../components/SymbolCatalog'
import { StyledContentContainer } from '../../styles/GeneralStyles';

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