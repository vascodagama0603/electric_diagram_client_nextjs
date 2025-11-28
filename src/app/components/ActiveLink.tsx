// src/app/components/ActiveLink.tsx
"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavLink } from '../../styles/GeneralStyles';
import {ActiveLinkProps} from '../../lib/type'

export const ActiveLink: React.FC<ActiveLinkProps> = ({ href, label }) => {
    const pathname = usePathname();
    const isActive = pathname === href || (href !== '/' && pathname.startsWith(href + '/'));
    return (
        <Link href={href} key={href}>
            <NavLink $active={isActive}>
                {label}
            </NavLink>
        </Link>
    );
};