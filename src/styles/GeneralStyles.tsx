// src/styles/GeneralStyles.js
"use client";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { keyframes } from "@emotion/react";

export const SectionTitle = styled.h3`
    color: #34495e;
    border-bottom: 2px solid #ccc;
    padding-bottom: 5px;
    margin-top: 30px;
    margin-bottom: 15px;
`;
export const CopyrightWarning = styled.p`
    color: #e74c3c;
    font-weight: 700;
    font-size: 1.1em;
    padding: 15px;
    border: 2px solid #e74c3c;
    border-radius: 6px;
    background-color: #fcecec; 
    margin-top: 20px;
    line-height: 1.5;
`;
export const CenteredContent = styled.div`
    text-align: center;
    max-width: 700px;
    margin: 0 auto;
`;
export const MailActionArea = styled.div`
    margin-top: 30px;
    margin-bottom: 20px;
`;
export const MailLink = styled.span`
    display: block;
    font-size: 1.2rem;
    font-weight: bold;
    word-break: break-all;
    color: #007bff;
    text-decoration: underline;
    cursor: pointer;
    margin-bottom: 15px;
    &:hover { color: #0056b3; }
`;
export const CopyButton = styled.button`
    padding: 8px 20px;
    background-color: #6c757d; 
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background-color 0.2s;
    &:hover { background-color: #5a6268; }
`;
export const Message = styled.div`
    color: ${props => props.color === 'error' ? 'red' : 'green'};
    margin-top: 10px;
    font-size: 0.9rem;
`;
export const BlogPageTitle = styled.h2`
    font-size: 2rem;
    color: #333;
    margin: 10px 0 30px 0;
    border-bottom: 3px solid #e74c3c; 
    padding-bottom: 5px;
`;
export const BlogContainer = styled.div`
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    gap: 30px;
`;
export const BlogArticleCard = styled.div`
    display: flex;
    background-color: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    text-decoration: none;
    color: inherit;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    &:hover {
        box-shadow: 0 8px 20px rgba(231, 76, 60, 0.2);
        transform: translateY(-5px);
        border-color: #e74c3c;
    }
    @media (max-width: 768px) {
        flex-direction: column;
    }
`;
export const ArticleImage = styled.img`
    width: 200px;
    height: 100%;
    object-fit: cover; 
    flex-shrink: 0; 
    border-right: 1px solid #eee;

    @media (max-width: 768px) {
        width: 100%;
        height: 200px;
        flex-shrink: 1;
    }
`;
export const ArticleContent = styled.div`
    padding: 20px;
    flex-grow: 1;
    @media (max-width: 768px) {
        padding: 15px;
    }
`;
export const ArticleTitle = styled.h3`
    font-size: 1.4rem;
    margin: 0 0 10px 0;
    font-weight: 700;
    text-decoration: none; 
    color: #333;
`;
export const ArticleSummary = styled.p`
    font-size: 1rem;
    color: #555;
    line-height: 1.6;
    margin-bottom: 15px;
`;
export const ArticleMeta = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.85rem;
    color: #888;
    border-top: 1px dashed #eee;
    padding-top: 10px;
`;
export const TagList = styled.div`
    display: flex;
    gap: 8px;
`;
export const Tag = styled.span`
    background-color: #fcecec; 
    color: #e74c3c;
    padding: 4px 8px;
    border-radius: 4px;
    font-weight: 600;
    font-size: 0.8rem;
`;
export const StatusMessage = styled.div`
    text-align: center;
    padding: 50px;
    font-size: 1.2rem;
`;
export const StyledOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
`;
export const StyledDescriptionBox = styled.div`
    position: relative;
    width: 90%;
    max-width: 700px;
    padding: 30px;
    border-radius: 12px;
    background-color: #ffffff;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    transform: scale(1);
    transition: transform 0.3s ease-out;
`;
export const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    cursor: pointer;
    color: #a0a0a0;
    padding: 5px;
    &:hover {
        color: #e74c3c;
    }
`;
export const DescriptionTitle = styled.h3`
    font-size: 1.5rem;
    color: #0056b3;
    border-bottom: 2px solid #007bff;
    padding-bottom: 5px;
    margin-top: 0;
    margin-bottom: 15px;
`;
export const DescriptionContent = styled.p`
    font-size: 1rem;
    line-height: 1.7;
    color: #333;
    text-align: justify;
`;
export const StyledComment = styled.p`
  font-size: 0.5rem;
  color: #777;
  margin: 4px auto 10px;
`;
export const StyledSubComment = styled.p`
  font-size: 0.5rem;
  font-weight: 600;
  color: #333;
  margin: 5px auto 0px;
`;
export const StyledImageArea = styled.div`
  margin: 2em auto; 
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0 10px;
`;
export const StyledImage = styled.img`
  object-fit: contain;
  margin: 10px;
  max-width: 100px;
  height: 100px;
`;
export const StyledOnImageButton = styled.div`
  cursor: pointer;
  position: absolute;
  bottom: 5px;
  right: 5px;
  color: #fff;
`;
export const SvgButton = styled.button`
  font-size: 0.8rem;
  width: 30px;
  height: 30px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  background: skyblue;
  border: 2px solid skyblue;
  &:hover {
    background: #fff;
  color: skyblue;
  }
`;
export const DxfButton = styled(SvgButton)`
  background: orange;
  border: 2px solid orange;
  &:hover {
    background: #fff;
    color: orange;
  }
  margin-top:5px;
`;
export const SignalBox = styled(Box)`
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  padding: 10px;
  margin: 5px;
  width: 130px;
  text-align: center;
  transition: all 0.3s ease-in-out;
  &:hover {
    box-shadow: 0px 8px 16px rgba(0, 40, 80, 0.1);
    transform: translateY(-7px);
    border-color: #007bff;
  }
`;
export const PageTitle = styled.h2`
    font-size: 2rem;
    color: #333;
    margin: 3px 0 3px 0;
    border-bottom: 3px solid #007bff;
    padding-bottom: 5px;
`;
export const NotFoundMessage = styled.div`
    width: 100%;
    text-align: center;
    padding: 50px 0;
    font-size: 1.2rem;
    color: #6c757d;
    background-color: #f8f9fa;
    border-radius: 8px;
    margin-top: 20px;
    max-width: 95%; 
    margin: 30px auto; 
`;
export const SearchInput = styled.input`
    width: 100%;
    padding: 12px 20px;
    margin-bottom: 25px;
    border: 2px solid #ccc;
    border-radius: 8px;
    font-size: 1.1rem;
    outline: none;
    transition: border-color 0.3s;
    box-sizing: border-box; 
    &:focus {
        border-color: #007bff;
    }
`;
export const StyledStatusContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 20000;
  opacity: 1;
  transition: opacity 0.3s ease-in-out;
  border-radius: 12px;
`;
export const Spinner = styled.div`
  border: 5px solid #f3f3f3;
  border-top: 5px solid #007bff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: 10px;
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
export const StatusText = styled.div`
  color: #007bff;
  font-size: 0.9rem;
  font-weight: 600;
`;

// src/app/components/LayoutComponents.tsx
export const StyledHeader = styled.header`
    background-color: #007bff;
    padding: 5px 15px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column; 
    align-items: center; 
    width: 100%; 

`;
export const NavList = styled.nav`
    display: flex;
    gap: 30px; 
    align-items: center;

    @media (max-width: 350px) {
        flex-direction: column; 
        gap: 5px; 
    }
`;
export const StyledFooter = styled.footer`
    background-color: #343a40;
    color: #f8f9fa;
    padding: 15px;
    text-align: center;
    font-size: 0.85rem;
    margin-top: auto;
`;
export const FooterLinks = styled.div`
    margin-bottom: 10px;
    & > * {
        margin: 0 10px;
        text-decoration: none;
        cursor: pointer;
        font-weight: 500;
        color: #adb5bd;
        &:hover {
            color: white;
            text-decoration: underline;
        }
    }
`;
export const FooterLink = styled.span`
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
export const GlobalLayoutContainer = styled.div`
    flex-direction: column;
    min-height: 100vh;
`;
export const MainContentWrapper = styled.main`
    flex-grow: 1;
    width: 100%; 
    max-width: 1400px;
    margin: 0 auto;
`;
export const StyledContentContainer = styled.div`
    max-width: 1500px;
    margin: 0 auto;

    @media (max-width: 768px) {
        padding: 0 16px; 
    }
    
    @media (min-width: 769px) {
        padding: 0;
    }
    h1 {
        font-size: 1.5em;
        margin-bottom: 0.5em;
        color: #212529;
    }    
    h2 {
        font-size: 1.0em;
        padding: 5px 5px; 
        color: #212529;
        font-weight: bold;
        background-color: #f0f8ff; 
        border-radius: 6px;
        border-left: 5px solid #007bff;
    }
    h3 {
     position: relative;
        font-size: 0.7em;
        display: inline-block;
        padding: 0 0 5px 0;
        color: #333;
        font-weight: bold;
        border-bottom: 3px solid #007bff;
        border-image: linear-gradient(to right, #007bff 50%, transparent 100%) 1; 
    }
    p {
        margin-bottom: 5px;
    }
    table {
        width: 100%;
        border-collapse: collapse;
        margin: 1.5em 0;
        font-size: 0.9em;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
        border-radius: 8px;
        overflow: hidden; 
        background-color: #ffffff;
        & > p > table, 
        & > div > table,
        & > table 
        {
            display: block;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
        }
    }
    th, td {
        padding: 12px 15px;
        text-align: left;
        border-bottom: 1px solid #dddddd;
    }

    th {
        background-color: #007bff; 
        color: #ffffff;
        font-weight: bold;
        text-transform: uppercase; 
    }

    tr:nth-of-type(even) {
        background-color: #f3f3f3; 
    }

    tr:hover {
        background-color: #e6f7ff; 
        cursor: pointer;
    }

    tr:last-of-type {
        td {
            border-bottom: none;
        }
    }

    @media (max-width: 768px) {
        & table {
            width: 700px;
            display: block;
        }
    }
`;

// src/app/components/ActiveLink.tsx
export const NavLink = styled.span<{ $active: boolean }>`
    font-size: 0.8rem;
    color: ${props => (props.$active ? '#ffeb3b' : 'white')};
    text-decoration: none;
    font-weight: ${props => (props.$active ? 'bold' : '500')};
    padding: 5px 0;
    position: relative;
    transition: color 0.3s;
    cursor: pointer;

    &:hover {
        color: #ffeb3b;
    }

    ${props => props.$active && `
        &::after {
            content: '';
            position: absolute;
            bottom: -1px;
            left: 0;
            width: 100%;
            height: 3px;
            background-color: #ffeb3b;
            border-radius: 2px;
        }
    `}
`;

// src/app/components/BlogTag.tsx
export const TagsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 15px;
    padding: 10px 0;
`;
export const TagBadge = styled.span`
    display: inline-block;
    padding: 6px 12px;
    background-color: #f0f0f0;
    color: #495057;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background-color: #e0e0e0;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
`;

// src/app/components/ClientTagFilter.tsx
export const FilteredTagButton = styled.button<{ $active: boolean }>`
    padding: 8px 16px;
    border: ${props => (props.$active ? '1px solid #007bff' : '1px solid #ccc')};
    border-radius: 20px; 
    cursor: pointer;
    transition: all 0.3s ease; 
    background-color: ${props => (props.$active ? '#007bff' : '#f8f9fa')};
    color: ${props => (props.$active ? 'white' : '#333')};
    font-weight: ${props => (props.$active ? 'bold' : 'normal')};
`;
export const FilterdButtonLayout = styled.div`
    margin-bottom: 10px; 
    display: flex;
    flex-wrap: wrap; 
    gap: 8px;
`;
export const FilterCancelButton = styled.button`
    margin-left: 10px;
    padding: 8px 16px;
    border-radius: 20px;
    cursor: pointer;
    background-color: transparent;
    color: #dc3545;
    font-weight: normal;
`;

// src/app/blog/[slug]/ArticleClient.tsx
export const ArticleBody = styled.div`
    line-height: 1.8;
    img {
        max-width: 100%; 
        height: auto; 
        display: block; 
        margin: 20px 0; 
        border-radius: 8px; 
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    line-height: 1.8;
    h1, h2, h3, h4 { margin-top: 2em; margin-bottom: 0.8em; }
    h1 { font-size: 1.8rem; }
    h2 { font-size: 1.6rem; border-left: 5px solid #007bff; padding-left: 10px; }
    h3 { font-size: 1.4rem; }
    p { margin-bottom: 1.5em; }
    ul, ol { 
        margin-left: 1.5em; 
        padding-left: 0;
        margin-bottom: 1.5em; 
    }
    pre {
        background-color: #f4f4f4;
        padding: 15px;
        border-radius: 5px;
        overflow-x: auto;
        font-family: 'Consolas', 'Courier New', monospace;
    }
`;

// src/app/blog/[slug]/TableOfContents.tsx
export const TocContainer = styled.div`
    border: 1px solid #e9ecef;
    border-radius: 6px;
    padding: 15px;
    margin: 25px 0;
    background-color: #ffffff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.03);
`;
export const TocTitle = styled.h4`
    font-size: 1.05em;
    font-weight: 700;
    color: #212529;
    margin-top: 0;
    margin-bottom: 10px;
    padding-bottom: 5px;
    border-bottom: 2px solid #007bff;
`;
export const TocList = styled.ul`
    list-style: none;
    padding-left: 0;
    margin-bottom: 0;
`;
export const TocItem = styled.li<{ level: number }>`
    margin-bottom: 1px;
    font-size: 0.7rem;
    transition: background-color 0.2s; 
    padding-left: ${({ level }) => {
        if (level === 2) return '15px'; 
        if (level === 3) return '30px';
        return '0';
    }};
    position: relative;
    &::before {
        content: '${({ level }) => {
            if (level === 2) return '▶';
            if (level === 3) return '・';
            return '■';
        }}'; 
        color: ${({ level }) => (level === 1 ? '#007bff' : (level === 2 ? '#007bff' : '#6c757d'))};
        font-size: ${({ level }) => (level === 1 ? '0.8em' : '0.7em')};
        margin-right: 8px;
        position: absolute;
        left: ${({ level }) => {
            if (level === 2) return '0';
            if (level === 3) return '15px';
            return '-10px';
        }};
        top: 3px;
    }
    a {
        color: #333;
        text-decoration: none;
        display: block;
        padding: 0;
        
        &:hover {
            color: #007bff;
        }
    }
`;


// src/app/page.tsx
export const EditorLayout = styled.div`
    display: flex;
    flex-grow: 1;
    gap: 0px;
    height: calc(100vh - 150px);
`;

export const CanvasLayout = styled.div`
    flex-grow: 1;
    background-color: baseColors.editorBg;
    border: 1px solid #e2e8f0;
    border-radius: 1.5rem;
    box-shadow: inset 0 1px 3px 0 rgba(0, 0, 0, 0.08);
    overflow: auto;
    position: relative;
`;
export const PaletteLayout = styled.div`
    width: 300px;
    background-color: #f1f5f9;
    border-radius: 1rem;
    padding: 1.5rem;
    overflow-y: auto;
    box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
`;
export const HoverPath = styled.path`
  stroke-width: 4px;
  pointer-events: none;
  fill: none;
  stroke: navy;
  &[data-primary="true"] {
    stroke: tomato;
  }
`;
export const NormalPath = styled.path`
  stroke-width: 4px;
  fill: none;
  stroke: navy;
`;

export const HoverLine = styled.svg<{ consx: number, consy: number }>`
  position: absolute;
  top: ${props => props.consy};
  left: ${props => props.consx};
  zIndex: 10;
  overflow: visible;

  &[data-primary="true"] {
    stroke: tomato;
    border: 3px dashed tomato;
  }
`;

// src/app/components/Tree.tsx
export const InputSpecs = styled.input`
    width: 100%; 
    padding: 1rem;
    border-radius: 0.75rem; 
    border: 2px solid #f59e0b;
    background-color:#fffbeb;
    font-size: 1rem; 
    resize: vertical;
    margin-bottom: 1.5rem; 
    outline: none; 
`;
export const TextAreaSpecs = styled.textarea`
    width: 100%; 
    padding: 1rem;
    border-radius: 0.75rem; 
    border: 2px solid #f59e0b;
    background-color:#fffbeb;
    font-size: 1rem; 
    resize: vertical;
    margin-bottom: 1.5rem; 
    outline: none; 
    rows:2;
    
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const ModalTableStyle = styled.div`
  border-radius: 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  width: auto;
  height: auto;
  padding: 2rem;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  animation: ${fadeIn} 0.3s ease-out forwards; /* Correctly injects the keyframes */

  @media (max-width: 768px) {
    padding: 2rem;
    width: 95%; /* Corrected from 95px to 95% */
    max-width: none; /* Allows the width: 95% to take effect */
  }
`;