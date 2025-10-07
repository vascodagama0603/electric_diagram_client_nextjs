import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header, Footer, MainContentArea, ContentWrapper, MainContent } from './components/LayoutComponents';






const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CAD用 電気シンボル DXF/SVG 無料ダウンロード",
  description: "電気図面作成に必要なJIS規格の電気シンボルを提供します。a接点、遮断器、押しボタンなど",
  icons: {
    icon: [
      // SVGが最も高解像度で優先される
      { url: './favicon.svg', type: 'image/svg+xml' }, 
      // 互換性のため、通常サイズのPNGやICOも併用推奨
      { url: './favicon.ico' },
    ],
},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="jp">
      {/* AdSenseのスクリプトをheadに追加 */}
      <head>
          <script 
              async 
              src={process.env.NEXT_PUBLIC_ADSENCE_URL}
              crossOrigin="anonymous"
          ></script>
        
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <MainContentArea>
            <Header />
            <ContentWrapper>
                {/* <Sidebar /> の場所 */}
                <MainContent>
                    {children} {/* 各ページのコンテンツがここに入る */}
                </MainContent>
            </ContentWrapper>
            <Footer />
        </MainContentArea>
      </body>
    </html>
  );
}
