// src/app/components/LayoutComponents.tsx
"use client";
import Link from 'next/link';
import { ActiveLink } from './ActiveLink';
import {LayoutProps} from '../../lib/type'
import { GlobalLayoutContainer, 
         MainContentWrapper,
         StyledHeader,
         NavList,
         StyledFooter,
         FooterLinks,
         FooterLink,
        } from '../../styles/GeneralStyles'; 



const Menu = () => {
    const links = [
        { href: '/', label: 'Auto電気図面' },
        { href: '/symbol_download', label: 'シンボルダウンロード' },
        { href: '/blog', label: '技術ブログ' },
        // { href: '/contact', label: 'お問い合わせ' },
        // { href: '/about', label: '運営者情報' },
    ];

    return (
        <NavList>
            {links.map((link) => (
                <ActiveLink key={link.href} href={link.href} label={link.label} />
            ))}
        </NavList>
    );
};

export const Header = () => (
   <StyledHeader>

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
            {children}
        </MainLayout>
    );
};

