// app/layout.tsx
import type { Metadata } from "next";
import Script from 'next/script'; // next/scriptをインポートする
import { GlobalLayoutContainer, MainContentWrapper } from './../styles/GeneralStyles';
import './globals.css'; 
import { ToastContainer } from 'react-toastify'

const GA_MEASUREMENT_ID = 'G-GKF9VPTXYB';

export const metadata: Metadata = {
  title: "電気図面自動生成ツール",
  description: "簡単なクリック操作で電気図面の概略図を生成します",
  icons: {
    icon: [
        { url: '/favicon.svg', type: 'image/svg+xml' }, 
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
    <html lang="jp">
      <head>
        <script 
            async 
            src={process.env.NEXT_PUBLIC_ADSENCE_URL}
            crossOrigin="anonymous"
        ></script>

      </head>
      <body>
           <ToastContainer position="top-right" autoClose={3000} />
          <GlobalLayoutContainer>            
              <MainContentWrapper>
                  {children} 
              </MainContentWrapper>
          </GlobalLayoutContainer>
        <Script 
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} 
            strategy="afterInteractive" 
        />
        <Script id="gtag-init" strategy="afterInteractive" dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `,
        }}/>
      </body>
    </html>
  );
}