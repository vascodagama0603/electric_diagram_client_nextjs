'use client';
import React, { useState, useCallback, CSSProperties, useEffect } from 'react';

import {TreeNode,LayoutNode,SelectOption,SVGConnectionProps,CustomSelectFieldProps,
  NodeRendererProps,NoteEditorModalProps,
  DecisionSelectModalProps,TreeDisplayProps,
  ConnectionMapProps,ConnectionRendererProps
} from '../../lib/type'
import {saveTreeDataToLocalStorage} from '../../lib/localStrage'
import {Signals} from '../../lib/data/signalsData'
import {baseColors,nodeStyles,buttonStyles,ModalContentStyle,OverlayStyle} from '../page_css'
import {} from './TreePalette'
import {HoverPath,NormalPath,HoverLine} from '../../styles/GeneralStyles'

const NODE_WIDTH = 150;
const NODE_HEIGHT = 70;
const HORIZONTAL_SPACING = 10;
const VERTICAL_SPACING = 40;

const CloseIcon = (color: string) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>);
const ChevronDownIcon = (color: string) => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>);
const EditIcon = (color: string) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.85 0 0 0-4 0L7 13v4h4l6-6A2.85 2.85 0 0 0 17 3Z"/><path d="m15 5 4 4"/><path d="M19 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-12a2 2 0 0 1 2-2h4"/></svg>);

export const ROOT_SELECT_OPTIONS: SelectOption[] = [
    { id: '3φ3w', caption: '3φ3w',  wire:3,color: baseColors.default },
    { id: '1φ2w', caption: '1φ2w', wire:2, color: baseColors.default },
];
export const INITIAL_TREE_DATA: TreeNode[] = [
    {
        id: 'root',
        type: 'decision',
        caption: ROOT_SELECT_OPTIONS[0].id,
        note: '3φ3W\n20A\n200V', 
        children: [
        {
            id: '1',
            type: 'decision',
            caption: "S00144+S00287_3P",
            note: 'ELB01\n30A30mA\n三菱電機', 
            children: [
                {
            id: '2',
            type: 'decision',
            caption: "S00284_3P",
            note: 'MC01\n30A\n富士電機', 
            children: [
                {
            id: '3',
            type: 'decision',
            caption: "S00325_3P",
            note: 'THR01\n30A\n富士電機', 
            children: [
                {
            id: '4',
            type: 'decision',
            caption: "S00819_3P",
            note: 'M01\n5kW\n三菱電機', 
            children: [],
        },
            ],
        },
            ],
        },
            ],
        },
        ],
    },

];
export const generateId = () => Math.random().toString(36).substring(2, 9);
export const findNode = (nodes: TreeNode[], id: string, parent?: TreeNode): { node: TreeNode | undefined, parent: TreeNode | undefined, index: number } => {
    for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].id === id) {
            return { node: nodes[i], parent, index: i };
        }
        const result = findNode(nodes[i].children, id, nodes[i]);
        if (result.node) {
            return result;
        }
    }
    return { node: undefined, parent: undefined, index: -1 };
};

export const useTreeUpdater = (setTreeData: React.Dispatch<React.SetStateAction<TreeNode[]>>) => {
    return useCallback(
        (id: string, field: 'caption' | 'note', value: string) => {

            setTreeData(prevTree => {
                const newTree = JSON.parse(JSON.stringify(prevTree));
                const { node } = findNode(newTree, id);
                if (node) {
                    if (field === 'caption') {
                        node.caption = value;
                    } else if (field === 'note') {
                        node.note = value;
                    }
                    saveTreeDataToLocalStorage(newTree); 
                }
                return newTree;
            });
        },
        [setTreeData]
    );
};
const SELECT_OPTIONS: SelectOption[] = Signals

const calculateTreeLayout = (nodes: TreeNode[]): { layoutNodes: LayoutNode[], dimensions: { width: number, height: number } } => {
    if (nodes.length === 0) { return { layoutNodes: [], dimensions: { width: 0, height: 0 } }; }
    const layoutNodes: LayoutNode[] = [];
    const nodeMap = new Map<string, LayoutNode>();

    const calculateWidths = (node: TreeNode): number => {
        if (node.children.length === 0) { return NODE_WIDTH + HORIZONTAL_SPACING; }
        const childrenWidth = node.children.reduce((sum, child) => sum + calculateWidths(child), 0);
        return Math.max(NODE_WIDTH + HORIZONTAL_SPACING, childrenWidth);
    };

    const totalWidths = nodes.map(calculateWidths);
    const overallTotalWidth = totalWidths.reduce((sum, width) => sum + width, 0);

    let maxY = 0;

    const positionNode = (node: TreeNode, depth: number, offsetLeft: number, occupiedWidth: number) => {
        const nodeY = depth * (NODE_HEIGHT + VERTICAL_SPACING);
        const nodeX = offsetLeft + occupiedWidth / 2 - NODE_WIDTH / 2;

        const layoutNode: LayoutNode = {
            ...node,
            x: nodeX,
            y: nodeY,
            width: NODE_WIDTH,
            height: NODE_HEIGHT,
        };
        layoutNodes.push(layoutNode);
        nodeMap.set(node.id, layoutNode);
        maxY = Math.max(maxY, nodeY + NODE_HEIGHT);

        let currentChildOffset = offsetLeft;
        
        node.children.forEach(child => {
            const childWidth = calculateWidths(child);
            positionNode(child, depth + 1, currentChildOffset, childWidth);
            currentChildOffset += childWidth;
        });
    };

    let rootOffset = 0;
    nodes.forEach((node, index) => {
        const occupiedWidth = totalWidths[index];
        positionNode(node, 0, rootOffset, occupiedWidth);
        rootOffset += occupiedWidth;
    });

    const PADDING_X = 50; 
    const finalWidth = overallTotalWidth + PADDING_X * 2; 
    const finalHeight = maxY + VERTICAL_SPACING + 20;

    layoutNodes.forEach(node => {
        node.x += (finalWidth - overallTotalWidth) / 2 - (HORIZONTAL_SPACING/2); // 中央寄せ調整
    });

    return {
        layoutNodes,
        dimensions: { width: finalWidth, height: finalHeight },
    };
};


const CustomSelectField: React.FC<CustomSelectFieldProps> = ({ nodeId, value, onTriggerOpen, options, isRoot, note }) => {
    const selectedOption = options.find(opt => opt.id === value) || options[0];
    const [isHover, setIsHover] = useState(false);

    const buttonStyle: CSSProperties = {
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '12px 16px', borderRadius: '12px',
        border: `3px solid ${isRoot ? baseColors.primary : baseColors.default}70`,
        backgroundColor: '#f8fafc', cursor: 'pointer',
        boxShadow: isHover ? `0 0 0 4px ${baseColors.default}40` : '0 4px 8px rgba(0, 0, 0, 0.05)',
        transition: 'all 0.2s', transform: isHover ? 'scale(1.02)' : 'scale(1.0)',
        flexDirection: 'column',
    };

    return (
        <div style={{ position: 'relative', width: '100%' ,}} onClick={() => onTriggerOpen(nodeId, value, isRoot)} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
            <div style={{...buttonStyle,pointerEvents: 'none'}}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ minWidth: '3px' }}>{}</div>
                        <span style={{ fontSize: isRoot ? '0.7rem' : '0.5rem', color: '#1f2937', fontWeight: '700' }}>
                            {selectedOption.caption && selectedOption.caption.length > 20 ? selectedOption.caption.substring(0, 20) + '...' : selectedOption.caption}
                        </span>
                    </div>
                    <div style={{ color: baseColors.primary }}>{ChevronDownIcon(baseColors.primary)}</div>
                </div>
                {note && note.trim().length > 0 && (
                    <div style={{ width: '100%', fontSize: '0.5rem', color: baseColors.warning, fontWeight: '600', textAlign: 'right', borderTop: '1px dashed #e5e7eb' }}>
                        <span style={{ backgroundColor: baseColors.warning, color: 'white', padding: '2px 6px', borderRadius: '6px' }}>メモあり</span>
                    </div>
                )}
            </div>
        </div>
    );
};




export const NoteEditorModal: React.FC<NoteEditorModalProps> = ({ state, onSave, onClose }) => {
    const [noteContent, setNoteContent] = useState(state.currentNote);
    const [isSaveHover, setIsSaveHover] = useState(false);
    useEffect(() => { if (state.isOpen) { setNoteContent(state.currentNote); } }, [state.currentNote, state.isOpen]);
    if (!state.isOpen || !state.nodeId) return null;
    return (
        <OverlayStyle onClick={onClose}>
            <ModalContentStyle onClick={(e) => e.stopPropagation()}>
                <h3 style={{ fontWeight: '700', fontSize: '1.5rem', color: baseColors.warning, marginBottom: '0.5rem' }}>ノードメモ編集</h3>
                <textarea value={noteContent} onChange={(e) => setNoteContent(e.target.value)} placeholder="メモの内容..." style={{ width: '100%', minHeight: '200px', padding: '1rem', borderRadius: '0.75rem', border: `2px solid ${baseColors.warning}40`, backgroundColor: '#fffbeb', fontSize: '1rem', resize: 'vertical', marginBottom: '1.5rem', outline: 'none' }} />
                <button onClick={() => onSave(state.nodeId!, noteContent)} onMouseEnter={() => setIsSaveHover(true)} onMouseLeave={() => setIsSaveHover(false)} style={{ ...buttonStyles.rootButton(isSaveHover), backgroundColor: baseColors.warning, ...(isSaveHover && { backgroundColor: '#d97706' }), width: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{EditIcon('white')}<span style={{ marginLeft: '8px' }}>メモを保存する</span></div>
                </button>
                <button onClick={onClose} style={{ position: 'absolute', top: '20px', right: '20px', backgroundColor: baseColors.danger, color: 'white', border: 'none', borderRadius: '50%', width: '35px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>{CloseIcon('white')}</button>
            </ModalContentStyle>
            <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }`}</style>
        </OverlayStyle>
    );
};
export const DecisionSelectModal: React.FC<DecisionSelectModalProps> = ({ state, onSelect, onClose ,treeData}) => {
    if (!state.isOpen || !state.nodeId) return null;
    const options = state.isRoot ? ROOT_SELECT_OPTIONS.slice(0) : SELECT_OPTIONS.slice(0);
    const handleSelect = (value: string) => { onSelect(state.nodeId!, value, treeData); onClose(); };
    return (
            <OverlayStyle onClick={onClose}>
                <ModalContentStyle onClick={(e) => e.stopPropagation()} >
                <h3 style={{ fontWeight: '700', fontSize: '1.25rem', color: baseColors.primary, marginBottom: '1rem' }}>{state.isRoot ? 'テーマを選択' : 'シンボルを選択'}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {options.map(option => (
                        <button key={option.id} onClick={() => handleSelect(option.id)} style={{ display: 'flex', alignItems: 'center', padding: '12px', borderRadius: '10px', border: `2px solid ${option.color}40`, backgroundColor: option.id === state.currentValue ? `${option.color}20` : '#f8fafc', cursor: 'pointer', transition: 'all 0.1s', fontWeight: '600', color: '#1f2937', boxShadow: option.id === state.currentValue ? `0 0 0 3px ${option.color}60` : 'none' }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = `${option.color}20`)} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = option.id === state.currentValue ? `${option.color}20` : '#f8fafc')}>
                            <div style={{ marginRight: '10px' }}>{}</div><span>{option.caption}</span>
                        </button>
                    ))}
                </div>
                <button onClick={onClose} style={{ position: 'absolute', top: '15px', right: '15px', backgroundColor: baseColors.danger, color: 'white', border: 'none', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }}>{CloseIcon('white')}</button>
            </ModalContentStyle>
        </OverlayStyle>
    );
};


export const TreeDisplay: React.FC<TreeDisplayProps> = ({ nodes, updateNode, onRemove, openSelectModal, openNoteModal, onDropNode, onDropLineNode }) => {
    const { layoutNodes, dimensions } = calculateTreeLayout(nodes);
    const layoutMap = new Map(layoutNodes.map(n => [n.id, n]));
    const connections: SVGConnectionProps[] = [];
    const consMapParent:ConnectionMapProps[] = [];
    const consMapChild:ConnectionMapProps[] = [];
    const consMapNothing:ConnectionMapProps[] = [];
    layoutNodes.forEach(childNode => {
        const parent = layoutNodes.find(n => n.children.some(c => c.id === childNode.id));
        if (parent) {
            const parentNode = layoutMap.get(parent.id);
            if (parentNode) {
                connections.push({ parent: parentNode, child: childNode, childLen:parentNode.children.length,color: baseColors.lineColor });
            }
        }
    });
    connections.forEach(cons =>{
        const pY = cons.parent.y + cons.parent.height-15;
        const cX = cons.child.x + cons.child.width / 2;
        const cY = cons.child.y;
        const mY = pY  + (cY - pY) / 2;

        const startX = cons.parent.x
        const startChildX = cons.child.x
        
        const startY = cons.parent.y + cons.parent.height-20
        const offsetX = (cons.parent.width) / 2
        const offsetChildX = (cons.parent.width) / 2

        const SidelX =-( cons.child.x - cons.parent.x );
        const startSideX = cX

        const lY = VERTICAL_SPACING + 20
        const width = cons.parent.width
        const height = lY
        const side_height = 4

        const height_half = height/2

        if (cons.childLen<=1){
            consMapParent.push({id:generateId(),type:"parent",parentNode:cons.parent,childNode:cons.child,code:`M ${offsetX} ${0} V ${lY}`, color: baseColors.lineColor,x:startX,y:startY,width:width,height:height})
        }
        else{            
            consMapParent.push({id:generateId(),type:"parent",parentNode:cons.parent,childNode:cons.child,code:`M ${offsetX} ${0} V ${height_half}`, color: baseColors.lineColor,x:startX,y:startY,width:width,height:height_half})
            consMapNothing.push({id:generateId(),type:"nothing",parentNode:cons.parent,childNode:cons.child,code:`M ${0} ${0} H ${SidelX}`, color: baseColors.lineColor,x:startSideX,y:mY,width:width,height:side_height})
            consMapChild.push({id:generateId(),type:"child",parentNode:cons.parent,childNode:cons.child,code:`M ${offsetChildX} ${0} V ${height_half}`, color: baseColors.lineColor,x:startChildX,y:mY-2,width:width,height:height_half})
        }       
    })
    const handleRemoveNode = useCallback((id: string) => { onRemove(id); }, [onRemove]);
    return (
        <div style={{ position: 'relative', width: dimensions.width, height: dimensions.height, minHeight: '100%', minWidth: '100%' }}>
            
                {consMapParent.map(con => (
                  <SVGConnection
                  key = {generateId()} 
                  onDropLineNode={onDropLineNode}
                  cons = {con} />))}

                {consMapChild.map(con => (
                  <SVGConnection
                  key = {generateId()} 
                  onDropLineNode={onDropLineNode}
                  cons = {con} />))}
                  
                {consMapNothing.map(con => (
                    <svg style={{ 
                        position: 'absolute', 
                        top: con.y, 
                        left: con.x, 
                        zIndex: 10, 
                        overflow: 'visible' 
                        }} 
                        key = {generateId()}
                        width={con.width} 
                        height={con.height}
                    >
                <NormalPath key={con.id} d={con.code} />
            </svg>))}
            <div>
                {layoutNodes.map((node, index) => (
                    <NodeRenderer 
                        key={node.id} 
                        node={node} 
                        onRemove={handleRemoveNode} 
                        isRoot={index === 0 && node.id === 'root'} 
                        openSelectModal={openSelectModal} 
                        openNoteModal={openNoteModal} 
                        onDropNode={onDropNode}
                    />
                ))}
            </div>
        </div>
    );
};


const NodeRenderer: React.FC<NodeRendererProps> = ({ node, onRemove, isRoot, openSelectModal, openNoteModal, onDropNode }) => {
    const [isHover, setIsHover] = useState(false);
    const [isDragOver, setIsDragOver] = useState(false);
    const nodeSpecificStyles = true ? nodeStyles.root() : nodeStyles.decision();
    const containerStyle: CSSProperties = { 
        ...nodeStyles.base(), 
        ...nodeSpecificStyles, 
        left: node.x, 
        top: node.y, 
        ...(isHover && !false ? nodeStyles.hoverEffect : {}),
        ...(isDragOver ? nodeStyles.dragOver : {}),
    };
    
    const [isNoteHover, setIsNoteHover] = useState(false);
    const [isRemoveHover, setIsRemoveHover] = useState(false);
    const currentOptions = isRoot ? ROOT_SELECT_OPTIONS : SELECT_OPTIONS;
    const nodeValue = node.caption || currentOptions[0].id;
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    };
    const handleDragLeave = () => {
        setIsDragOver(false);
    };
    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        const newItemValue = e.dataTransfer.getData('application/react-dnd-item');
        if (newItemValue) {
            onDropNode(node.id, newItemValue);
        }
    };

    return (
        <div 
            style={containerStyle}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <CustomSelectField nodeId={node.id} value={nodeValue} onTriggerOpen={openSelectModal} options={currentOptions} isRoot={isRoot} note={node.note} />
            </div>
            
            <div style={{ position: 'absolute', top: '-10px', right: isRoot ? '-10px' : '-15px', zIndex: 60, display: 'flex', gap: '0.5rem', opacity: isHover || isRoot ? 1 : 0, transition: 'opacity 0.3s ease-in-out' }}>
                <button onClick={(e) => { e.stopPropagation(); openNoteModal(node.id, node.note); }} onMouseEnter={() => setIsNoteHover(true)} onMouseLeave={() => setIsNoteHover(false)} style={buttonStyles.note(isNoteHover)} title="メモ">
                    {EditIcon('white')}
                </button>
                {!isRoot && (
                    <button onClick={(e) => { e.stopPropagation(); onRemove(node.id); }} onMouseEnter={() => setIsRemoveHover(true)} onMouseLeave={() => setIsRemoveHover(false)} style={buttonStyles.remove(isRemoveHover)} title="削除">
                        {CloseIcon('white')}
                    </button>
                )}
            </div>
        </div>
    );
};

const SVGConnection:React.FC<ConnectionRendererProps> = ({cons,onDropLineNode }) => {
   const [isHover, setIsHover] = useState(false);
    const [isDragOver, setIsDragOver] = useState(false);
    const nodeSpecificStyles = true ? nodeStyles.root() : nodeStyles.decision();
    const containerStyle: CSSProperties = { 
        ...nodeStyles.base(), 
        ...nodeSpecificStyles, 
        ...(isHover && !false ? nodeStyles.hoverEffect : {}),
        ...(isDragOver ? nodeStyles.dragOver : {}),
    };
    
    const [isNoteHover, setIsNoteHover] = useState(false);
    const [isRemoveHover, setIsRemoveHover] = useState(false);
    const currentOptions = SELECT_OPTIONS;
    const nodeValue = currentOptions[0].id;
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    };
    const handleDragLeave = () => {
        setIsDragOver(false);
    };
    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        const newItemValue = e.dataTransfer.getData('application/react-dnd-item');
        if (newItemValue) {
            onDropLineNode(cons, newItemValue);
        }
    };
    return (
        
        <div>
            <HoverLine style={{ 
                    top: cons.y, 
                    left: cons.x, 
                    
                }} 
                
                consx ={cons.x}
                consy ={cons.y}
                data-primary ={isDragOver}
                width={cons.width} 
                height={cons.height}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <HoverPath 
                    data-primary={isDragOver}
                    key={cons.id} 
                    d={cons.code}
                    />
            </HoverLine>
        </div>
    );
};

