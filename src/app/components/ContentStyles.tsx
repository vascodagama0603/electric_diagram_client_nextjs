// app/components/ContentStyles.tsx
"use client";
import styled from "@emotion/styled";

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
    max-width: 900px;
    margin: 0 auto;
    line-height: 1.8;

    @media (max-width: 768px) {
        padding: 0 16px; 
    }
    
    @media (min-width: 769px) {
        padding: 0;
    }
    h1 {
        font-size: 2.2em;
        margin-bottom: 0.5em;
        color: #212529;
    }    
    h2 {
        font-size: 1.8em;
        padding: 12px 15px; 
        margin: 2.5em 0 1.2em 0;
        color: #212529;
        font-weight: bold;
        background-color: #f0f8ff; 
        border-radius: 6px;
        border-left: 5px solid #007bff;
    }
    h3 {
        font-size: 1.4em;
        padding: 0 0 5px 0;
        margin: 1.8em 0 0.8em 0;
        color: #333;
        font-weight: bold;
        border-bottom: 3px solid #007bff;
        border-image: linear-gradient(to right, #007bff 50%, transparent 50%) 1; 
    }
    p {
        margin-bottom: 15px;
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