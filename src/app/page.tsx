// app/page.tsx
import { PageLayout } from './components/LayoutComponents';
import {SymbolCatalog} from './components/SymbolCatalog'

export default function Home() {
  return (
    <>
        <PageLayout>
            {/* SymbolCatalog は内部で 'use client' を持つ */}
            <SymbolCatalog />
        <p style={{textAlign: 'center', margin: '20px 0'}}>JISC0617をもとにシンボルを制作しています</p>
        </PageLayout>
    </>
  );
}