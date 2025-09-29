"use client"; 
import {SymbolCatalog} from './SymbolCatalog'

import { Box } from "@mui/material";
import styled from "@emotion/styled";
const Header = () => (
    <StyledHeader>
        <AppTitle>🔌 電気シンボル・ライブラリ</AppTitle>
    </StyledHeader>
);

const Sidebar = () => (
    <StyledSidebar>
        <SidebarTitle>カテゴリ</SidebarTitle>
        <SidebarList>
            <SidebarItem>接点 / スイッチ</SidebarItem>
            <SidebarItem>開閉器 / 遮断器</SidebarItem>
            <SidebarItem>リレー / コイル</SidebarItem>
            <SidebarItem>その他</SidebarItem>
        </SidebarList>
    </StyledSidebar>
);

const Footer = () => (
    <StyledFooter>
        &copy; {new Date().getFullYear()} Electric Diagram Library. All rights reserved.
    </StyledFooter>
);
export default function Home() {
  return (
    <>
        <MainContentArea>
            <Header />
            <ContentWrapper>
                {/*<Sidebar />*/}
                <MainContent>
                    <SymbolCatalog />
                </MainContent>
            </ContentWrapper>
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


const OnImageStatus = styled.div`

  cursor: pointer;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #000;
  font-size: 12px;
  background: yellow;
  opacity: 0.5;
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