'use client';
import Image from 'next/image'
import React, { useState, CSSProperties} from 'react';

import {TreeNode,SelectOption,
} from '../../lib/type'
import {Signals} from '../../lib/data/signalsData'
import {baseColors} from '../page_css'
import {PaletteLayout} from '../../styles/GeneralStyles'

const base = process.env.NODE_ENV === 'production' ? '/' : '/';


const SELECT_OPTIONS: SelectOption[] = Signals
const paletteItemStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    padding: '12px',
    marginBottom: '10px',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    cursor: 'grab',
    border: '1px solid #e2e8f0',
    transition: 'transform 0.1s, box-shadow 0.1s',
};


const PaletteItem: React.FC<{ option: SelectOption }> = ({ option }) => {
        // console.log("PaletteItem")
    const [isHover, setIsHover] = useState(false);

    const handleDragStart = (e: React.DragEvent) => {
        e.dataTransfer.setData('application/react-dnd-item', option.id);
        e.dataTransfer.effectAllowed = 'copy';
    };

    return (
        <div
            draggable
            onDragStart={handleDragStart}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            style={{
                ...paletteItemStyle,
                transform: isHover ? 'translateY(-2px)' : 'none',
                boxShadow: isHover ? '0 4px 6px rgba(0,0,0,0.1)' : paletteItemStyle.boxShadow,
            }}
        >
            <span style={{ fontWeight: 600, color: '#334155' }}>{option.caption}</span>
            <div style={{ marginLeft: 'auto', color: baseColors.default }}>
                <Image
                     src={base + option.id +".svg"} 
                     alt={option.id}
                     width="50" 
                     height="20" 
                />
            </div>
        </div>
    );
};

export const NodePalette: React.FC = () => {
    return (
        <PaletteLayout>
            <h3 style={{ fontSize: '1.0rem', fontWeight: 'bold', marginBottom: '0.1rem', color: '#334155' }}>ノードパレット</h3>
            <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '' }}>
                項目をドラッグして、右側のツリー内の親ノードにドロップしてください。
            </p>
            {SELECT_OPTIONS.slice(0).map(option => (
                <PaletteItem key={option.id} option={option} />
            ))}
        </PaletteLayout>
    );
};
