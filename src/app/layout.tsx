import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";





const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JIS電気シンボル ライブラリ | CAD用 DXF/SVG 無料ダウンロード",
  description: "電気図面作成に必要なJIS規格の回路シンボルを無料提供。a接点、遮断器、押しボタンなどDXF",
  icons: {
    icon: [
      // SVGが最も高解像度で優先される
      { url: '/favicon.svg', type: 'image/svg+xml' }, 
      // 互換性のため、通常サイズのPNGやICOも併用推奨
      { url: '/favicon.ico' },
    ],
},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
