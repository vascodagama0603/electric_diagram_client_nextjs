// app/page.tsx

"use client"; 
import {SymbolCatalog} from './components/SymbolCatalog'

// HeaderとFooterがlayout.tsxに移動したため、大幅にシンプルになります。

export default function Home() {
  return (
    <>
        {/* <MainContentAd /> */}
        <SymbolCatalog />
        <p style={{textAlign: 'center', margin: '20px 0'}}>JISC0617をもとにシンボルを制作しています</p>
    </>
  );
}