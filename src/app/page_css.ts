import React, { useState, useCallback, CSSProperties, useEffect } from 'react';

import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
const NODE_WIDTH = 150;
const NODE_HEIGHT = 80;

export const baseColors = {
    primary: '#1d4ed8',
    primaryLight: '#3b82f6',
    lineColor: '#1d4ed8', 
    background: '#f8fafc',
    card: '#ffffff',
    editorBg: '#ffffff',
    success: '#059669',
    warning: '#f59e0b',
    danger: '#dc2626',
    default: '#64748b',
    info: '#3b82f6',
    purple: '#9333ea',
};

export const HOVER_SHADOW: CSSProperties = {
    transform: 'translateY(-2px)',
    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.15), 0 5px 10px rgba(0, 0, 0, 0.1)',
};

export const nodeStyles = {
    base: (): CSSProperties => ({
        position: 'absolute',
        width: NODE_WIDTH,
        height: NODE_HEIGHT-1000,
        padding: '0px',
        borderRadius: '10px',
        
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1), 0 5px 10px rgba(0, 0, 0, 0.05)',
        transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, sans-serif',
        backgroundColor: baseColors.card,
        zIndex: 50,
    }),
    root: (): CSSProperties => ({
        backgroundColor: baseColors.card,
    }),
    decision: (): CSSProperties => ({
        border: '3px solid #cbd5e1',
    }),
    hoverEffect: HOVER_SHADOW,
    // ドロップターゲット時のスタイル
    dragOver: {
        border: `3px dashed ${baseColors.primary}`,
        transform: 'scale(1.02)',
    } as CSSProperties,
};
export const buttonStyles = {
    note: (isHover: boolean): CSSProperties => ({
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        boxShadow: '0 3px 6px rgba(0, 0, 0, 0.3)',
        transition: 'background-color 0.2s, transform 0.1s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        border: 'none',
        color: 'white',
        padding: '4px',
        backgroundColor: isHover ? baseColors.warning : '#f59e0b',
        transform: isHover ? 'scale(1.15)' : 'scale(1.0)',
    }),
    remove: (isHover: boolean): CSSProperties => ({
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        boxShadow: '0 3px 6px rgba(0, 0, 0, 0.3)',
        transition: 'background-color 0.2s, transform 0.1s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        border: 'none',
        color: 'white',
        padding: '4px',
        backgroundColor: isHover ? baseColors.danger : '#ef4444',
        transform: isHover ? 'scale(1.15)' : 'scale(1.0)',
    }),
    rootButton: (isHover: boolean): CSSProperties => ({
        padding: '0.75rem 2rem',
        backgroundColor: isHover ? baseColors.primaryLight : baseColors.primary,
        color: 'white',
        fontWeight: 'bold',
        borderRadius: '0.75rem',
        boxShadow: '0 6px 12px -2px rgba(0, 0, 0, 0.2)',
        transition: 'background-color 0.15s, transform 0.15s',
        cursor: 'pointer',
        border: 'none',
        transform: isHover ? 'translateY(-1px)' : 'translateY(0)',
    }),
};

export const OverlayStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  backdrop-filter: blur(3px);
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

export const ModalContentStyle = styled.div`
  background-color: ${baseColors.card}; /* Use template literal for JS variables */
  border-radius: 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  width: 400px;
  max-height: 80vh;
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

export const RootButton = styled.button`
    padding: 0.5rem 1.0rem;
    font-size: 0.5rem;
    background-color: ${baseColors.primary}
    color: white;
    font-weight: bold;
    border-radius: 0.75rem;
    box-shadow: 0 6px 12px -2px rgba(0, 0, 0, 0.2);
    transition: background-color 0.15s, transform 0.15s;
    cursor: pointer;
    border: none;
    transform: translateY(0);
    &:hover {
        color: ${baseColors.primaryLight};
        transform: translateY(-1px);
    }
`;
export const ResetButton = styled(RootButton)`
    background-color: ${baseColors.danger};
    color: white;
    margin-right: 1rem;
    &:hover {
        background-color: #b91c1c;
        color: white;
    }
`;
export const SvgButton = styled(RootButton)`
    background-color: ${baseColors.primaryLight};
    color: white;
    margin-right: 1rem;
    &:hover {
        background-color: ${baseColors.primary};
        color: white;
    }
`;