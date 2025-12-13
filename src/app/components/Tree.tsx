'use client';
import React, { useState, useCallback, CSSProperties, useEffect } from 'react';

import {TreeNode,LayoutNode,SelectOption,SVGConnectionProps,CustomSelectFieldProps,
  NodeRendererProps,NoteEditorModalProps,
  DecisionSelectModalProps,TreeDisplayProps,
  ConnectionMapProps,ConnectionRendererProps,
  Device,Power,Sw,OffDelaySw,OnDelaySw,OnDelayOffDelaySw,
  Dev,Elb,MagnetSwitch,CircuitBreaker,Coil,Thermal,TouthSensor,
  ProximitySwitch,Fuze,Motor,ThermoCouple,Lamp,Buzzer,
  Specification,NoteModalState
} from '../../lib/type'
import {saveTreeDataToLocalStorage} from '../../lib/localStrage'
import {Signals} from '../../lib/data/signalsData'
import {baseColors,nodeStyles,buttonStyles,ModalContentStyle,OverlayStyle} from '../page_css'
import {} from './TreePalette'
import { HoverPath,NormalPath,HoverLine,InputSpecs, TextAreaSpecs} from '../../styles/GeneralStyles'
import { categoryLabels } from '../../lib/data/label';
import { SpecificationOrder } from '@/lib/data/signalsProperty';
import { generateId } from './Logic';
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


const CustomSelectField: React.FC<CustomSelectFieldProps> = ({ nodeId, value, onTriggerOpen, options, isRoot, device}) => {
    const selectedOption = options.find(opt => opt.id === value) || options[0];
    const [isHover, setIsHover] = useState(false);
    const keys = Object.keys(device.specification).filter(k => k !== 'id' && k !== 'type' && k !== 'signature' && k !== 'signatureNumber' && k !== 'phase');
    const isWrite = keys.some((key) => {
        const currentValue: any = device.specification[key as keyof Specification];
        return currentValue !== "" && currentValue !== 0})

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
                {isWrite && (
                    <div style={{ width: '100%', fontSize: '0.5rem', color: baseColors.warning, fontWeight: '600', textAlign: 'right', borderTop: '1px dashed #e5e7eb' }}>
                        <span style={{ backgroundColor: baseColors.warning, color: 'white', padding: '2px 6px', borderRadius: '6px' }}>メモあり</span>
                    </div>
                )}
            </div>
        </div>
    );
};




export const NoteEditorModal: React.FC<NoteEditorModalProps> = ({ state, onSave, onClose }) => {
    const [device, setDevice] = useState<Device>(state.device);
    const [nodeId, setNodeId] = useState<string | null>(state.nodeId);
    const [isSaveHover, setIsSaveHover] = useState(false);
    useEffect(() => { 
        if (state.isOpen) {
            //console.log("open")
             setDevice(state.device); 
             setNodeId(state.nodeId)
        }},[state.device,
            state.nodeId,
            state.isOpen]
    );

    if (!state.isOpen || !state.nodeId) return null;

    const handleChange = (key: string, value: any) => {
        //console.log("KEY:",key)
        //console.log("value:",value)
        setDevice(prevData => ({
            ...prevData,
            specification:{
                ...prevData.specification,
                [key]: value
            }
        }) as Device); 
    };
    const renderFields = (item: Device,id:string | null) => {
        if(item && id){
            const keys = Object.keys(item.specification).filter(k => k !== 'id' && k !== 'type' && k !== 'phase');
            return SpecificationOrder.map((key) => {
                if (!keys.includes(key)){
                    return null
                }
                let currentValue: any;
                let inputType: string = 'text';
                
                if (item.specification.type === "POWER") {
                    currentValue = item.specification[key as keyof Power];
                } else if (item.specification.type === "DEVICE") {
                    currentValue = item.specification[key as keyof Dev];
                }else if (item.specification.type === "SW") {
                    currentValue = item.specification[key as keyof Sw];
                }else if (item.specification.type === "OFFDELAYSW") {
                    currentValue = item.specification[key as keyof OffDelaySw];
                }else if (item.specification.type === "ONDELAYSW") {
                    currentValue = item.specification[key as keyof OnDelaySw];
                }else if (item.specification.type === "ONDELAYOFFDELAYSW") {
                    currentValue = item.specification[key as keyof OnDelayOffDelaySw];
                }else if (item.specification.type === "MC") {
                    currentValue = item.specification[key as keyof MagnetSwitch];
                }else if (item.specification.type === "CP") {
                    currentValue = item.specification[key as keyof CircuitBreaker];
                }else if (item.specification.type === "COIL") {
                    currentValue = item.specification[key as keyof Coil];
                }else if (item.specification.type === "THR") {
                    currentValue = item.specification[key as keyof Thermal];
                }else if (item.specification.type === "TS") {
                    currentValue = item.specification[key as keyof TouthSensor];
                }else if (item.specification.type === "AP") {
                    currentValue = item.specification[key as keyof ProximitySwitch];
                }else if (item.specification.type === "FZ") {
                    currentValue = item.specification[key as keyof Fuze];
                }else if (item.specification.type === "M") {
                    currentValue = item.specification[key as keyof Motor];
                }else if (item.specification.type === "TC") {
                    currentValue = item.specification[key as keyof ThermoCouple];
                }else if (item.specification.type === "PL") {
                    currentValue = item.specification[key as keyof Lamp];
                }else if (item.specification.type === "BZ") {
                    currentValue = item.specification[key as keyof Buzzer];
                }else if (item.specification.type === "ELB") {
                    currentValue = item.specification[key as keyof Elb];
                }
                if (key === 'modelNumber') inputType = 'textarea';
                //if (typeof currentValue === 'boolean') inputType = 'checkbox';
                
        //console.log("currentValue]:",key)
            return (
            <div key={id+"_"+key}>
                <p>{categoryLabels[key]}</p>
            {inputType === 'textarea' ? (
                <TextAreaSpecs
                id={id+"_"+key}
                value={currentValue || ''}
                onChange={(e) => handleChange(key, e.target.value)}
                />
            ) : (
                <InputSpecs
                type={inputType}
                id={id+"_"+key}
                value={currentValue || ''}
                onChange={(e) => handleChange(key, e.target.value)}
                />
            )}
            </div>
            );
            })

        }
    };
    return (
        <OverlayStyle onClick={onClose}>
            <ModalContentStyle onClick={(e) => e.stopPropagation()}>
                <h3 style={{ fontWeight: '700', fontSize: '1.5rem', color: baseColors.warning, marginBottom: '0.5rem' }}>ノードメモ編集</h3>
                {device && <p>{categoryLabels[device.type]}</p>}
                {device && renderFields(device,nodeId)}
                <button 
                    onClick={() => onSave(state.nodeId!, device)} 
                    onMouseEnter={() => setIsSaveHover(true)} 
                    onMouseLeave={() => setIsSaveHover(false)} 
                    style={{ 
                        ...buttonStyles.rootButton(isSaveHover), 
                        backgroundColor: baseColors.warning, 
                        ...(isSaveHover && { backgroundColor: '#d97706' }), 
                        width: '100%' }}>
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


export const TreeDisplay: React.FC<TreeDisplayProps> = ({ nodes, onRemove, openSelectModal, openNoteModal, onDropNode, onDropLineNode }) => {
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
    const nodeValue = node.device?.caption || currentOptions[0].id;
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
                <CustomSelectField 
                    nodeId={node.id} 
                    value={nodeValue} 
                    onTriggerOpen={openSelectModal} 
                    options={currentOptions} 
                    isRoot={isRoot} 
                    device={node.device} />
            </div>
            
            <div 
            style={{ 
                position: 'absolute', 
                top: '-10px', 
                right: isRoot ? '-10px' : '-15px', 
                zIndex: 60, 
                display: 'flex', 
                gap: '0.5rem', 
                opacity: isHover || isRoot ? 1 : 0, 
                transition: 'opacity 0.3s ease-in-out' }}>
                <button 
                    onClick={(e) => { 
                        e.stopPropagation(); 
                        openNoteModal(
                            node.id, 
                            node.device); 
                    }} 
                    onMouseEnter={() => 
                        setIsNoteHover(true)
                    } 
                    onMouseLeave={() => 
                        setIsNoteHover(false)
                    } 
                    style={buttonStyles.note(isNoteHover)} 
                    title="メモ"
                >
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
    const [isDragOver, setIsDragOver] = useState(false);
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

