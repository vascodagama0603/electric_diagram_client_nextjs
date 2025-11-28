'use client';

import React, { useState, useCallback, CSSProperties, useEffect } from 'react';

import axios from "axios";
import {TreeNode,LayoutNode,SelectOption,SVGConnectionProps,CustomSelectFieldProps,
  NodeRendererProps,NoteModalState,NoteEditorModalProps,SelectModalState,
  DecisionSelectModalProps,TreeDisplayProps
} from '../lib/type'
import {loadTreeDataFromLocalStorage,saveTreeDataToLocalStorage} from '../lib/localStrage'
import {baseColors,nodeStyles,buttonStyles,styles,ModalContentStyle,OverlayStyle} from './page_css'
import {Signals} from '../lib/data/signalsData'

import swal from 'sweetalert2';

const NODE_WIDTH = 280;
const NODE_HEIGHT = 120;
const HORIZONTAL_SPACING = 60;
const VERTICAL_SPACING = 80;

const CloseIcon = (color: string) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>);
const ChevronDownIcon = (color: string) => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>);
const EditIcon = (color: string) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.85 0 0 0-4 0L7 13v4h4l6-6A2.85 2.85 0 0 0 17 3Z"/><path d="m15 5 4 4"/><path d="M19 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-12a2 2 0 0 1 2-2h4"/></svg>);

const ROOT_SELECT_OPTIONS: SelectOption[] = [
    { id: '3w3φ', caption: '3w3φ',  color: baseColors.default },
    { id: '2w2φ', caption: '2w2φ', color: baseColors.default },
    { id: '2w3φ', caption: '2w1φ', color: baseColors.default },
];

const SELECT_OPTIONS: SelectOption[] = Signals

const INITIAL_TREE_DATA: TreeNode[] = [
    {
        id: 'root',
        type: 'decision',
        specification: ROOT_SELECT_OPTIONS[0].id,
        note: '',
        children: [
            { id: 'c1', type: 'decision', specification: SELECT_OPTIONS[0].id, note: '', children: [] },
        ],
    },
];

const findNode = (nodes: TreeNode[], id: string, parent?: TreeNode): { node: TreeNode | undefined, parent: TreeNode | undefined, index: number } => {
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

const useTreeUpdater = (setTreeData: React.Dispatch<React.SetStateAction<TreeNode[]>>) => {
    return useCallback(
        (id: string, field: 'specification' | 'note', value: string) => {
            setTreeData(prevTree => {
                const newTree = JSON.parse(JSON.stringify(prevTree));
                const { node } = findNode(newTree, id);
                if (node) {
                    if (field === 'specification') {
                        node.specification = value;
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

const generateId = () => Math.random().toString(36).substring(2, 9);

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

const SVGConnection: React.FC<SVGConnectionProps> = ({ parent, child, color }) => {
    const pX = parent.x + parent.width / 2;
    const pY = parent.y + parent.height;
    const cX = child.x + child.width / 2;
    const cY = child.y;
    const mY = pY + (cY - pY) / 2;

    const pathData = `M ${pX} ${pY} V ${mY} H ${cX} V ${cY}`;

    return (
        <path
            d={pathData}
            stroke={color}
            strokeWidth="4" 
            fill="none" 
            strokeLinecap="round"
        />
    );
};

const CustomSelectField: React.FC<CustomSelectFieldProps> = ({ nodeId, value, onTriggerOpen, options, isRoot, note }) => {
    
    const selectedOption = options.find(opt => opt.id === value) || options[0];
    const [isHover, setIsHover] = useState(false);

    const buttonStyle: CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        padding: '12px 16px', 
        borderRadius: '12px',
        border: `3px solid ${isRoot ? baseColors.primary : selectedOption.color}70`,
        backgroundColor: '#f8fafc', 
        cursor: 'pointer',
        boxShadow: isHover 
            ? `0 0 0 4px ${selectedOption.color}40` 
            : '0 4px 8px rgba(0, 0, 0, 0.05)',
        transition: 'all 0.2s',
        transform: isHover ? 'scale(1.02)' : 'scale(1.0)',
        flexDirection: 'column', // 縦に並べる
        gap: '8px',
    };

    return (
        <div 
            style={{ position: 'relative', width: '100%' }} 
            onClick={() => onTriggerOpen(nodeId, value, isRoot)} 
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <div style={buttonStyle}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>

                        <span style={{ 
                            fontSize: isRoot ? '1.1rem' : '1rem', 
                            color: '#1f2937', 
                            fontWeight: '700' 
                        }}>
                            {selectedOption.caption.length > 20 ? selectedOption.caption.substring(0, 20) + '...' : selectedOption.caption}
                        </span>
                    </div>
                    <div style={{ color: baseColors.primary }}>
                        {ChevronDownIcon(baseColors.primary)}
                    </div>
                </div>
                {/* ノード内にメモの有無を示すインジケーター */}
                {note && note.trim().length > 0 && (
                    <div style={{ 
                        width: '100%', 
                        fontSize: '0.75rem', 
                        color: baseColors.warning, 
                        fontWeight: '600',
                        textAlign: 'right',
                        paddingTop: '4px',
                        borderTop: '1px dashed #e5e7eb',
                    }}>
                        <span style={{ backgroundColor: baseColors.warning, color: 'white', padding: '2px 6px', borderRadius: '6px' }}>
                            メモあり
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

const NodeRenderer: React.FC<NodeRendererProps> = ({ node, onAddChild, onRemove, isRoot, openSelectModal, openNoteModal }) => {
    
    const [isHover, setIsHover] = useState(false);
    
    const nodeSpecificStyles = isRoot ? nodeStyles.root() : nodeStyles.decision();
    
    const containerStyle: CSSProperties = {
        ...nodeStyles.base(),
        ...nodeSpecificStyles,
        left: node.x,
        top: node.y,
        ...(isHover && !isRoot ? nodeStyles.hoverEffect : {}),
    };
    
    const [isAddHover, setIsAddHover] = useState(false);
    const [isNoteHover, setIsNoteHover] = useState(false);
    const [isRemoveHover, setIsRemoveHover] = useState(false);
    
    const currentOptions = isRoot ? ROOT_SELECT_OPTIONS : SELECT_OPTIONS;
    const nodeValue = node.specification || currentOptions[0].id;

    return (
        <div 
            style={containerStyle}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                
                <CustomSelectField
                    nodeId={node.id}
                    value={nodeValue}
                    onTriggerOpen={openSelectModal}
                    options={currentOptions}
                    isRoot={isRoot}
                    note={node.note} // メモを渡す
                />
                
            </div>

            {/* ノード操作ボタン */}
            <div style={{
                position: 'absolute',
                top: '-10px', 
                right: isRoot ? '-10px' : '-45px',
                zIndex: 60, 
                display: 'flex',
                gap: '0.5rem',
                opacity: isHover || isRoot ? 1 : 0, 
                transition: 'opacity 0.3s ease-in-out',
            }}>
                
                {/* メモボタン */}
                <button
                    onClick={() => openNoteModal(node.id, node.note)}
                    onMouseEnter={() => setIsNoteHover(true)}
                    onMouseLeave={() => setIsNoteHover(false)}
                    style={buttonStyles.note(isNoteHover)}
                    title="ノードにメモを書き込む"
                >
                    {EditIcon('white')}
                </button>
                
                {/* 条件ノード追加ボタン */}
                <button
                    onClick={() => onAddChild(node.id)} 
                    onMouseEnter={() => setIsAddHover(true)}
                    onMouseLeave={() => setIsAddHover(false)}
                    style={buttonStyles.add(isAddHover)}
                    title="条件ノードを追加"
                >
                    <svg style={{ width: '18px', height: '18px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
                </button>

                {/* 削除ボタン (ルート以外) */}
                {!isRoot && (
                    <button
                        onClick={() => onRemove(node.id)}
                        onMouseEnter={() => setIsRemoveHover(true)}
                        onMouseLeave={() => setIsRemoveHover(false)}
                        style={buttonStyles.remove(isRemoveHover)}
                        title="ノードを削除"
                    >
                        {CloseIcon('white')}
                    </button>
                )}
            </div>
        </div>
    );
};

const NoteEditorModal: React.FC<NoteEditorModalProps> = ({ state, onSave, onClose }) => {
    
    const [noteContent, setNoteContent] = useState(state.currentNote);
    const [isSaveHover, setIsSaveHover] = useState(false);

    useEffect(() => {
        setNoteContent(state.currentNote);
    }, [state.currentNote]);

    if (!state.isOpen || !state.nodeId) return null;

    const handleSave = () => {
        onSave(state.nodeId!, noteContent);
    };

    return (
        <OverlayStyle>
            <ModalContentStyle onClick={(e) => e.stopPropagation()} >
                <h3 style={{ fontWeight: '700', fontSize: '1.5rem', color: baseColors.warning, marginBottom: '0.5rem' }}>
                    ノードメモ編集
                </h3>
                <p style={{ color: '#6b7280', marginBottom: '1rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.75rem' }}>
                    このノードに関する補足情報を記入してください。
                </p>

                {/* メモ入力エリア */}
                <textarea
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    placeholder="メモの内容をここに記入..."
                    style={{
                        width: '100%',
                        minHeight: '200px',
                        padding: '1rem',
                        borderRadius: '0.75rem',
                        border: `2px solid ${baseColors.warning}40`,
                        backgroundColor: '#fffbeb',
                        fontSize: '1rem',
                        resize: 'vertical',
                        marginBottom: '1.5rem',
                        outline: 'none',
                    }}
                />

                {/* 保存ボタン */}
                <button
                    onClick={handleSave}
                    onMouseEnter={() => setIsSaveHover(true)}
                    onMouseLeave={() => setIsSaveHover(false)}
                    style={{
                        ...buttonStyles.rootButton(isSaveHover),
                        backgroundColor: baseColors.warning,
                        ...(isSaveHover && { backgroundColor: '#d97706' }),
                        width: '100%',
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {EditIcon('white')}
                        <span style={{ marginLeft: '8px' }}>メモを保存する</span>
                    </div>
                </button>
                
                {/* 閉じるボタン */}
                <button 
                    onClick={onClose} 
                    style={{
                        position: 'absolute',
                        top: '20px',
                        right: '20px',
                        backgroundColor: baseColors.danger,
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '35px', 
                        height: '35px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    }}
                >
                    {CloseIcon('white')}
                </button>

            </ModalContentStyle>
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </OverlayStyle>
    );
};

const DecisionSelectModal: React.FC<DecisionSelectModalProps> = ({ state, onSelect, onClose }) => {
    
    if (!state.isOpen || !state.nodeId) return null;

    const options = state.isRoot ? ROOT_SELECT_OPTIONS.slice(0) : SELECT_OPTIONS.slice(0);
    
 
    const handleSelect = (value: string) => {
        onSelect(state.nodeId!, value);
        onClose();
    };

    return (
        <OverlayStyle>
            <ModalContentStyle onClick={(e) => e.stopPropagation()} >
                <h3 style={{ fontWeight: '700', fontSize: '1.25rem', color: baseColors.primary, marginBottom: '1rem' }}>
                    {state.isRoot ? '電源電圧の仕様を選択' : '配置する機器を選択'}
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {options.map(option => (
                        <button
                            key={option.id}
                            onClick={() => handleSelect(option.id)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '12px',
                                borderRadius: '10px',
                                border: `2px solid ${option.color}40`,
                                backgroundColor: option.id === state.currentValue ? `${option.color}20` : '#f8fafc',
                                cursor: 'pointer',
                                transition: 'all 0.1s',
                                fontWeight: '600',
                                color: '#1f2937',
                                boxShadow: option.id === state.currentValue ? `0 0 0 3px ${option.color}60` : 'none',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = `${option.color}30`)}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = option.id === state.currentValue ? `${option.color}20` : '#f8fafc')}
                        >
                            <span>{option.caption}</span>
                        </button>
                    ))}
                </div>
                
                {/* 閉じるボタン */}
                <button 
                    onClick={onClose} 
                    style={{
                        position: 'absolute',
                        top: '15px',
                        right: '15px',
                        backgroundColor: baseColors.danger,
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '30px', 
                        height: '30px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                    }}
                >
                    {CloseIcon('white')}
                </button>
            </ModalContentStyle>
        </OverlayStyle>
    );
};

const TreeDisplay: React.FC<TreeDisplayProps> = ({ nodes, updateNode, onAddChild, onRemove, openSelectModal, openNoteModal }) => {
    
    const { layoutNodes, dimensions } = calculateTreeLayout(nodes);
    const layoutMap = new Map(layoutNodes.map(n => [n.id, n]));

    const connections: SVGConnectionProps[] = [];
    // ノード間の接続線データを生成
    layoutNodes.forEach(childNode => {
        // 現在のノードの親ノードを見つける (非常に非効率だが、シンプルなツリー構造を維持するため)
        const parent = layoutNodes.find(n => n.children.some(c => c.id === childNode.id));
        if (parent) {
            const parentNode = layoutMap.get(parent.id);
            if (parentNode) {
                connections.push({
                    parent: parentNode,
                    child: childNode,
                    color: baseColors.lineColor,
                });
            }
        }
    });

    const handleRemoveNode = useCallback((id: string) => { onRemove(id); }, [onRemove]);

    return (
        <div 
            style={{ 
                position: 'relative', 
                width: dimensions.width, 
                height: dimensions.height, 
                minHeight: '400px',
                minWidth: '100%',
            }}
        >
            {/* SVGオーバーレイ: 接続線を描画 */}
            <svg 
                style={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    pointerEvents: 'none', 
                    zIndex: 10,
                    overflow: 'visible', 
                }}
                width={dimensions.width}
                height={dimensions.height}
            >
                <g strokeLinejoin="round">
                    {connections.map((conn, index) => (
                    <SVGConnection key={index} {...conn} />
                    ))}
                </g>
            </svg>
            
            {/* ノードツリー本体 (絶対配置されたノード) */}
            <div style={{ position: 'relative', zIndex: 50 }}>
                {layoutNodes.map((node, index) => (
                    <NodeRenderer
                        key={node.id}
                        node={node}
                        updateNode={updateNode}
                        onAddChild={onAddChild}
                        onRemove={handleRemoveNode}
                        isRoot={index === 0 && node.id === 'root'}
                        openSelectModal={openSelectModal}
                        openNoteModal={openNoteModal}
                    />
                ))}
            </div>
        </div>
    );
};

const App: React.FC = () => {
    const [treeData, setTreeData] = useState<TreeNode[]>([]);
    console.log("tree:",treeData)
    const [isMobile, setIsMobile] = useState(false);
    const [selectModalState, setSelectModalState] = useState<SelectModalState>({
        isOpen: false,
        nodeId: null,
        currentValue: '',
        isRoot: false,
    });

    const [noteModalState, setNoteModalState] = useState<NoteModalState>({
        isOpen: false,
        nodeId: null,
        currentNote: '',
    });

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        let loadedData = loadTreeDataFromLocalStorage();
        if (loadedData == null){
          loadedData = INITIAL_TREE_DATA
        }
        setTreeData(loadedData);
    }, []); 

    const updateNode = useTreeUpdater(setTreeData);
                
    const onAddChild = useCallback((parentId: string) => {
        setTreeData(prevTree => {
            const newTree = JSON.parse(JSON.stringify(prevTree));
            const { node: parentNode } = findNode(newTree, parentId);

           
            if (parentNode && parentNode.children.length < 3) {
                const newNode: TreeNode = {
                    id: generateId(),
                    type: 'decision',
                    specification: SELECT_OPTIONS[0].id,
                    note: '',
                    children: [],
                };
                parentNode.children.push(newNode);
                saveTreeDataToLocalStorage(newTree);
                return newTree;
            } else if (parentNode) {
                 console.log("Maximum children limit reached.");
            }
            return prevTree;
        });
    }, []);

    const onRemove = useCallback((id: string) => {
        setTreeData(prevTree => {
            const newTree = JSON.parse(JSON.stringify(prevTree));
            const { parent, index } = findNode(newTree, id);

            if (parent && index !== -1) {
                parent.children.splice(index, 1);
                saveTreeDataToLocalStorage(newTree);
                return newTree;
            }
            return prevTree;
        });
    }, []);

    const openSelectModal = useCallback((id: string, currentValue: string, isRoot: boolean) => {
        setSelectModalState({
            isOpen: true,
            nodeId: id,
            currentValue: currentValue,
            isRoot: isRoot,
        });
    }, []);
    
    const handleSelect = useCallback((nodeId: string, value: string) => {
        updateNode(nodeId, 'specification', value);
    }, [updateNode]);

    const openNoteModal = useCallback((id: string, currentNote: string) => {
        setNoteModalState({
            isOpen: true,
            nodeId: id,
            currentNote: currentNote,
        });
    }, []);

    const handleNoteSave = useCallback((nodeId: string, note: string) => {
        updateNode(nodeId, 'note', note);
        setNoteModalState({ isOpen: false, nodeId: null, currentNote: '' });
    }, [updateNode]);
    
    const handleReset = () => {
        if (window.confirm("全てのツリーデータを削除して初期状態に戻します。よろしいですか？")) {
            setTreeData(INITIAL_TREE_DATA);
            saveTreeDataToLocalStorage(INITIAL_TREE_DATA);
            console.log("Tree data reset.");
        }
    };

    const hanldeSaveSvg = async() => {
      try{
        const params = new URLSearchParams();
        if (treeData.length > 0) {
            params.set('data', JSON.stringify(treeData));
        }

        const queryString = params.toString();
        const url = process.env.NEXT_PUBLIC_SERVER_URL + (queryString ? `?${queryString}` : '');
        const response = await axios.get(url, {
            responseType: 'blob', 
        });        
        if (response.status !== 200) {
            throw new Error(`API returned status ${response.status}`);
        }
        //const extType = 'image/svg+xml'
        //const ext = ".svg"

        const extType = 'image/vnd.dxf'
        const ext = ".dxf"

        const blob = new Blob([response.data], { type: extType });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        
        link.download = "test" + ext; 
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(link.href);
        document.body.removeChild(link);
        } 
      catch (error) {
        swal.fire({
            icon: "error",
            title: "通信異常",
            text: "ダウンロードできませんでした",
        });
        console.error('Error', error);
      }
    }

    return (
        <div style={styles.mainContainer(isMobile)}>
            <div style={styles.contentCard(isMobile)}>
                <h1 style={styles.header(isMobile)}>
                   電気図面自動生成ツール
                </h1>
                
                <div style={{ marginBottom: '1.5rem', textAlign: 'right' }}>
                     <button
                        onClick={handleReset}
                        style={{
                            ...buttonStyles.rootButton(false),
                            backgroundColor: baseColors.danger,
                            marginRight: '1rem',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#b91c1c')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = baseColors.danger)}
                    >
                        全データリセット
                    </button>
                    <button
                      onClick={hanldeSaveSvg}>
                        保存
                      </button>
                    <span style={{ fontSize: '0.875rem', color: baseColors.default }}>
                        データはブラウザのローカルストレージに自動保存されます。
                    </span>
                </div>

                <div style={styles.editorArea(isMobile)}>
                    {treeData.length > 0 ? (
                        <TreeDisplay
                            nodes={treeData}
                            updateNode={updateNode}
                            onAddChild={onAddChild}
                            onRemove={onRemove}
                            openSelectModal={openSelectModal}
                            openNoteModal={openNoteModal}
                        />
                    ) : (
                        <div style={{ textAlign: 'center', padding: '100px', color: baseColors.default }}>
                            <p>ツリーがありません。データを読み込むか、リセットボタンで初期状態に戻してください。</p>
                        </div>
                    )}
                </div>
            </div>
            
            <DecisionSelectModal
                state={selectModalState}
                onSelect={handleSelect}
                onClose={() => setSelectModalState({ isOpen: false, nodeId: null, currentValue: '', isRoot: false })}
            />

            <NoteEditorModal
                state={noteModalState}
                onSave={handleNoteSave}
                onClose={() => setNoteModalState({ isOpen: false, nodeId: null, currentNote: '' })}
            />
            
        </div>
    );
};

export default App;