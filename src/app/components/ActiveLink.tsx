// src/app/components/ActiveLink.tsx
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styled from "@emotion/styled";

// 💡 NavLinkのスタイル定義はLayoutComponents.tsxからこちらに移動
const NavLink = styled.span<{ $active: boolean }>`
    /* (LayoutComponents.tsxからNavLinkのスタイルをコピー) */
    font-size: 1.1rem;
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
            bottom: -5px;
            left: 0;
            width: 100%;
            height: 3px;
            background-color: #ffeb3b;
            border-radius: 2px;
        }
    `}
`;

interface ActiveLinkProps {
    href: string;
    label: string;
}

export const ActiveLink: React.FC<ActiveLinkProps> = ({ href, label }) => {
    const pathname = usePathname();
    
    const isActive = pathname === href || 
                     (href !== '/' && pathname.startsWith(href + '/'));

    return (
        <Link href={href} key={href}>
            <NavLink $active={isActive}>
                {label}
            </NavLink>
        </Link>
    );
};