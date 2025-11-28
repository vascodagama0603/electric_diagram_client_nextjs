// app/page.tsx
'use client';

import axios from "axios";
import React, { useState, useCallback, useEffect, } from 'react';


import { PageLayout } from './components/LayoutComponents';
import { StyledContentContainer } from './../styles/GeneralStyles';
import {TreeNode,NoteModalState,SelectModalState,} from '../lib/type'
import {loadTreeDataFromLocalStorage,saveTreeDataToLocalStorage} from '../lib/localStrage'
import {ResetButton,SvgButton} from './page_css'
import {TreeDisplay,DecisionSelectModal,NoteEditorModal,
      useTreeUpdater,findNode,generateId,INITIAL_TREE_DATA
} from './components/Tree'
import {NodePalette} from './components/TreePalette'
import { PageTitle, EditorLayout,CanvasLayout
} from '../styles/GeneralStyles';
import {FileExtensionType} from '../lib/type'
import swal from 'sweetalert2';

const base = process.env.NODE_ENV === 'production' ? '/' : '/';
const extSVG:FileExtensionType ={
  ext : ".svg",
  type: 'image/svg+xml',
  text: 'SVG',
  url:process.env.NEXT_PUBLIC_SERVER_URL+"/svg"
}
const extDXF ={
  ext : ".dxf",
  type: 'image/vnd.dxf',
  text: 'DXF',
  url:process.env.NEXT_PUBLIC_SERVER_URL+"/dxf"
}


const App: React.FC = () => {
    
    const [treeData, setTreeData] = useState<TreeNode[]>([]);
    //console.log("tree:",treeData)
    const [isMobile, setIsMobile] = useState(false);
    const [selectModalState, setSelectModalState] = useState<SelectModalState>({ isOpen: false, nodeId: null, currentValue: '', isRoot: false });
    const [noteModalState, setNoteModalState] = useState<NoteModalState>({ isOpen: false, nodeId: null, currentNote: '' });
    const updateNode = useTreeUpdater(setTreeData);

    useEffect(() => {
        // console.log("useEffect1")

        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        // console.log("useEffect2")
        setTreeData(loadTreeDataFromLocalStorage());
    }, []);

    const onDropNode = useCallback((targetId: string, newItemValue: string) => {
        // console.log("onDropNode")
        setTreeData(prevTree => {
            const newTree = JSON.parse(JSON.stringify(prevTree));
            const { node: parentNode } = findNode(newTree, targetId);

            if (parentNode && parentNode.children.length < 10) { 
                const newNode: TreeNode = { 
                    id: generateId(), 
                    type: 'decision', 
                    caption: newItemValue, 
                    note: '', 
                    children: [] 
                };
                parentNode.children.push(newNode);
                saveTreeDataToLocalStorage(newTree);
            } else {
                alert("これ以上子ノードを追加できません（最大10つ）");
            }
            return newTree;
        });
    }, []);

    const onRemove = useCallback((id: string) => {
        // console.log("onRemove")
        if (!window.confirm('このノードとそのすべての子ノードを削除しますか？')) return;
        setTreeData(prevTree => {
            const newTree = JSON.parse(JSON.stringify(prevTree));
            const { parent, index } = findNode(newTree, id);
            if (parent && index !== -1) {
                parent.children.splice(index, 1);
                saveTreeDataToLocalStorage(newTree);
            }
            return newTree;
        });
    }, []);

    const openSelectModal = useCallback((id: string, currentValue: string, isRoot: boolean) => setSelectModalState({ isOpen: true, nodeId: id, currentValue, isRoot }), []);
    const handleSelect = useCallback((nodeId: string, value: string) => updateNode(nodeId, 'caption', value), [updateNode]);
    const openNoteModal = useCallback((id: string, currentNote: string) => setNoteModalState({ isOpen: true, nodeId: id, currentNote }), []);
    const handleNoteSave = useCallback((nodeId: string, note: string) => { updateNode(nodeId, 'note', note); setNoteModalState({ isOpen: false, nodeId: null, currentNote: '' }); }, [updateNode]);
    const handleReset = () => { if (window.confirm("全てのデータをリセットしますか？")) { setTreeData(INITIAL_TREE_DATA); saveTreeDataToLocalStorage(INITIAL_TREE_DATA); } };


    const getDownloadFile = async (extType: FileExtensionType) =>{
        // console.log("getDownloadFile")
        try {
            const params = new URLSearchParams();
            // console.log(treeData)
            if (treeData.length > 0) {
                params.set('data', JSON.stringify(treeData));
            }
            const queryString = params.toString();
            const url = extType.url + (queryString ? `?${queryString}` : '');
            const response = await axios.get(url, {
                responseType: 'blob', 
            });
            if (response.status !== 200) {
                throw new Error(`API returned status ${response.status}`);
            }
            const blob = new Blob([response.data], { type: extType.type });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = extType.ext; 
            document.body.appendChild(link);
            link.click();
            URL.revokeObjectURL(link.href);
            document.body.removeChild(link);
            } catch (error) {
            swal.fire({
                icon: "error",
                title: "通信異常",
                text: "ダウンロードできませんでした",
            });      
            console.error('Error downloading the '+extType+' file:', error);
            }
    };

    return (
      <PageLayout>
        <StyledContentContainer>
                <PageTitle >Auto電気図面</PageTitle>
                <EditorLayout>
                    <NodePalette />
                    <CanvasLayout>
                        <div style={{ marginBottom: '0.5rem', textAlign: 'left' ,display: 'flex',}}>
                            <ResetButton onClick={handleReset}>リセット</ResetButton>
                            <SvgButton 
                                onClick={(e) => {
                                    e.stopPropagation(); 
                                    getDownloadFile(extSVG);
                                }}
                                tabIndex={0}>SVG</SvgButton>
                        </div>
                        {treeData.length > 0 ? 
                            <TreeDisplay 
                                nodes={treeData} 
                                updateNode={updateNode} 
                                onRemove={onRemove} 
                                openSelectModal={openSelectModal} 
                                openNoteModal={openNoteModal} 
                                onDropNode={onDropNode} 
                            /> 
                            : <div style={{ textAlign: 'center', padding: '100px' }}>Loading...</div>
                        }
                    </CanvasLayout>
                </EditorLayout>
            <DecisionSelectModal state={selectModalState} onSelect={handleSelect} onClose={() => setSelectModalState({ isOpen: false, nodeId: null, currentValue: '', isRoot: false })}  />
            <NoteEditorModal state={noteModalState} onSave={handleNoteSave} onClose={() => setNoteModalState({ isOpen: false, nodeId: null, currentNote: '' })} />
        </StyledContentContainer>
    </PageLayout>
    );
};

export default App;