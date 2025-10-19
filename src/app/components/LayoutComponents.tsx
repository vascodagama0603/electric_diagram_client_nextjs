
"use client";
import Link from 'next/link'; // next/link をインポート
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { ActiveLink } from './ActiveLink';
import { GlobalLayoutContainer, MainContentWrapper } from './ContentStyles'; 
interface LayoutProps {
    children: React.ReactNode;
}

const Menu = () => {
    // 💡 usePathname の使用を ActiveLink に委譲
    const links = [
        { href: '/', label: 'ホーム' },
        { href: '/blog', label: '技術ブログ' },
        { href: '/contact', label: 'お問い合わせ' },
        { href: '/about', label: '運営者情報' },
    ];

    return (
        <NavList>
            {links.map((link) => (
                // 💡 ActiveLink を使用
                <ActiveLink key={link.href} href={link.href} label={link.label} />
            ))}
        </NavList>
    );
};

export const Header = () => (
   <StyledHeader>
        <AppTitle>
            <Link href="/">
                <span style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
                    電気回路図シンボルライブラリ | CAD素材
                </span>
            </Link>
        </AppTitle>
        <Menu /> 
    </StyledHeader>
);

export const Footer = () => (
    <StyledFooter>
        <FooterLinks>
            <Link href="/privacy">
                <FooterLink>プライバシーポリシー</FooterLink>
            </Link>
            <Link href="/contact">
                <FooterLink>お問い合わせ</FooterLink>
            </Link>
            <Link href="/about">
                <FooterLink>運営者情報</FooterLink>
            </Link>
        </FooterLinks>
        &copy; {new Date().getFullYear()} Electric Diagram Library. All rights reserved.
    </StyledFooter>
);

const MainLayout = ({ children }: LayoutProps) => (
    <GlobalLayoutContainer>
        <Header /> 
        <MainContentWrapper>
            {children}
        </MainContentWrapper>
        <Footer />
    </GlobalLayoutContainer>
);

export const PageLayout = ({children }: LayoutProps) => {
    return (
        <MainLayout>
            <div style={{ display: 'flex', gap: '30px', alignItems: 'flex-start' }}>
                {/*<Sidebar />*/} 
                <div style={{ flexGrow: 1, minWidth: 0 }}>
                    {children}
                </div>
            </div>
        </MainLayout>
    );
};

const StyledHeader = styled.header`
    background-color: #007bff; /* Primary Blue */
    color: white;
    padding: 15px 30px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    
    /* 🚨 修正ポイント1: 縦並びにする */
    display: flex;
    flex-direction: column; 
    
    /* 💡 中央寄せにする */
    align-items: center; 
    
    width: 100%; 
    box-sizing: border-box; 
`;

const AppTitle = styled.h1`
    font-size: 1.8rem;
    /* 🚨 修正ポイント2: 下部に余白を追加し、タイトルとメニューを分離 */
    margin: 0 0 10px 0; 
    font-weight: 700;
    letter-spacing: 1px;
    text-align: center;
`;
const NavList = styled.nav`
    display: flex;
    gap: 30px; 
    align-items: center;
    
    /* 🚨 修正ポイント3: タイトルからのセパレータと上部パディング */
    margin-top: 5px; 
    padding-top: 10px; 
    border-top: 1px solid rgba(255, 255, 255, 0.3); /* 薄いセパレータライン */

    @media (max-width: 768px) {
        /* モバイル対応（ここでは省略） */
        /* ... */
    }
`;

// 各メニューリンクのスタイル
const NavLink = styled.span<{ $active: boolean }>`
    font-size: 1.1rem;
    color: ${props => (props.$active ? '#ffeb3b' : 'white')};
    text-decoration: none;
    font-weight: ${props => (props.$active ? 'bold' : '500')};
    padding: 5px 0;
    position: relative;
    transition: color 0.3s;
    cursor: pointer;

    /* 💡 ホバーエフェクト */
    &:hover {
        color: #ffeb3b;
    }

    /* 💡 アクティブなリンクの下線（モダンな強調） */
    ${props => props.$active && `
        &::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 0;
            width: 100%;
            height: 3px;
            background-color: #ffeb3b;
            border-radius: 2px;
        }
    `}
`;


const StyledFooter = styled.footer`
    background-color: #343a40; /* Dark Gray */
    color: #f8f9fa;
    padding: 15px;
    text-align: center;
    font-size: 0.85rem;
    margin-top: auto; /* フッターを最下部に固定 */
`;

const FooterLinks = styled.div`
    margin-bottom: 10px;
    & > * {
        margin: 0 10px;
        text-decoration: none;
        cursor: pointer;
        font-weight: 500;
        color: #adb5bd; /* リンクの色を少し明るく */
        &:hover {
            color: white;
            text-decoration: underline;
        }
    }
`;

const FooterLink = styled.span`
    text-decoration: none;
    cursor: pointer;
    font-weight: 400;
`;


export const MainContentArea = styled(Box)`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

export const ContentWrapper = styled(Box)`
    display: flex;
    flex-grow: 1;
`;

export const MainContent = styled.main`
    flex-grow: 1;
    padding: 20px 30px;
`;