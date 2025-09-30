"use client"; 
import {SymbolCatalog} from './SymbolCatalog'
import { Box } from "@mui/material";
import styled from "@emotion/styled";




const Header = () => (
    <StyledHeader>
        <AppTitle>電気回路図シンボルライブラリ | CAD素材</AppTitle>
    </StyledHeader>
);

const Footer = () => (
    <StyledFooter>
        &copy; {new Date().getFullYear()} Electric Diagram Library. All rights reserved.
    </StyledFooter>
);
export default function Home() {
  return (
    <>
        <head>
            <script 
                async 
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9180260030467303"
                crossOrigin="anonymous"
            ></script>
        </head>
        <MainContentArea>
            <Header />
            <ContentWrapper>
                {/*<Sidebar />*/}
                <MainContent>
                    {/* <MainContentAd /> */}
                    <SymbolCatalog />
                </MainContent>
            </ContentWrapper>
            <p>JISC0617をもとにシンボルを制作しています</p>
            <Footer />
        </MainContentArea>
    </>
  );
}


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

const StyledSidebar = styled.aside`
    width: 250px;
    background-color: #f8f9fa; /* Light Gray */
    padding: 20px;
    border-right: 1px solid #e0e0e0;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.05);
`;

const StyledFooter = styled.footer`
    background-color: #343a40; /* Dark Gray */
    color: #f8f9fa;
    padding: 15px;
    text-align: center;
    font-size: 0.85rem;
    margin-top: auto; /* フッターを最下部に固定 */
`;


const SidebarTitle = styled.h3`
    color: #007bff;
    margin-top: 0;
    border-bottom: 2px solid #007bff;
    padding-bottom: 5px;
    font-size: 1.2rem;
`;

const SidebarList = styled.ul`
    list-style: none;
    padding: 0;
`;

const SidebarItem = styled.li`
    padding: 8px 0;
    cursor: pointer;
    color: #333;
    &:hover {
        color: #007bff;
        font-weight: 600;
    }
`;

const MainContentArea = styled(Box)`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

const ContentWrapper = styled(Box)`
    display: flex;
    flex-grow: 1;
`;

const MainContent = styled.main`
    flex-grow: 1;
    padding: 20px 30px;
`;

const AdContainer = styled.div`
    margin-bottom: 20px;
    padding: 10px;
    background-color: #e9ecef; /* 目立たせるための薄い背景 */
    text-align: center;
    font-size: 0.8rem;
    color: #6c757d;
`;

const MainAdContainer = styled.div`
    margin-bottom: 30px;
    min-height: 100px; /* 広告が読み込まれるまでのスペースを確保 */
    background-color: #f1f3f5;
    text-align: center;
    padding: 5px 0;
`;
