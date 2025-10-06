
"use client";
import Link from 'next/link'; // next/link をインポート
import styled from "@emotion/styled";
import { Box } from "@mui/material";

// === Header Component ===
export const Header = () => (
    <StyledHeader>
        <AppTitle>
            <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                電気回路図シンボルライブラリ | CAD素材
            </Link>
        </AppTitle>
    </StyledHeader>
);

// === Footer Component ===
export const Footer = () => (
    <StyledFooter>
        <FooterLinks>
            {/* next/link に変更し、各ページのURLを指定 */}
            <Link href="/privacy" passHref>
                <FooterLink>プライバシーポリシー</FooterLink>
            </Link>
            <Link href="/contact" passHref>
                <FooterLink>お問い合わせ</FooterLink>
            </Link>
            <Link href="/about" passHref>
                <FooterLink>運営者情報</FooterLink>
            </Link>
        </FooterLinks>
        &copy; {new Date().getFullYear()} Electric Diagram Library. All rights reserved.
    </StyledFooter>
);

// === Styled Components (既存のpage.tsxから移動) ===

const StyledHeader = styled.header`
    background-color: #007bff; /* Primary Blue */
    color: white;
    padding: 15px 30px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
`;

const AppTitle = styled.h1`
    font-size: 1.8rem;
    margin: 0;
    font-weight: 700;
    letter-spacing: 1px;
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
    /* Linkコンポーネントが子要素に適用するためのスタイル */
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