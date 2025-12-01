// app/page.tsx
'use client';

import axios from "axios";
import React, { useState, useCallback, useEffect, } from 'react';


import { PageLayout } from './components/LayoutComponents';
import { StyledContentContainer } from './../styles/GeneralStyles';
import {TreeNode,NoteModalState,SelectModalState,SelectOption} from '../lib/type'
import {loadTreeDataFromLocalStorage,saveTreeDataToLocalStorage} from '../lib/localStrage'
import {ResetButton,SvgButton} from './page_css'
import {TreeDisplay,DecisionSelectModal,NoteEditorModal,
      useTreeUpdater,findNode,generateId,INITIAL_TREE_DATA,
} from './components/Tree'
import {NodePalette} from './components/TreePalette'
import { PageTitle, EditorLayout,CanvasLayout
} from '../styles/GeneralStyles';
import {FileExtensionType,ConnectionMapProps} from '../lib/type'
import swal from 'sweetalert2';
import {Signals} from './../lib/data/signalsData'
import {baseColors} from './page_css'

const extSVG:FileExtensionType ={
  ext : ".svg",
  type: 'image/svg+xml',
  text: 'autoElectric',
  url:process.env.NEXT_PUBLIC_SERVER_URL+"/svg"
}
const extDXF:FileExtensionType ={
  ext : ".dxf",
  type: 'application/dxf',
  text: 'autoElectric',
  url:process.env.NEXT_PUBLIC_SERVER_URL+"/dxf"
}

const ROOT_SELECT_OPTIONS: SelectOption[] = [
    { id: '3φ3w', caption: '3φ3w',  wire:3,color: baseColors.default },
    { id: '1φ2w', caption: '1φ2w', wire:2, color: baseColors.default },
];
const App: React.FC = () => {
    const [treeData, setTreeData] = useState<TreeNode[]>([]);
    const [isMobile, setIsMobile] = useState(false);
    const [selectModalState, setSelectModalState] = useState<SelectModalState>({ isOpen: false, nodeId: null, currentValue: '', isRoot: false });
    const [noteModalState, setNoteModalState] = useState<NoteModalState>({ isOpen: false, nodeId: null, currentNote: '' });
    const updateNode = useTreeUpdater(setTreeData);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        setTreeData(loadTreeDataFromLocalStorage());
    }, []);

    const onDropNode = useCallback((targetId: string, newItemValue: string) => {
        setTreeData(prevTree => {
            const newTree = JSON.parse(JSON.stringify(prevTree));
            const { node: parentNode } = findNode(newTree, targetId);

            if (parentNode) { 
                
                const roots = ROOT_SELECT_OPTIONS.concat(Signals);
                const targetDiagram = roots.find((diagram) => diagram.id == newItemValue);
                const parentDiagram = roots.find((diagram) => diagram.id == parentNode?.caption);

                if(targetDiagram && parentDiagram && targetDiagram?.wire <= parentDiagram?.wire){

                    const newNode: TreeNode = { 
                        id: generateId(), 
                        type: 'decision', 
                        caption: newItemValue, 
                        note: '', 
                        children: [] 
                    };
                    parentNode.children.push(newNode);
                    saveTreeDataToLocalStorage(newTree);
                }else{
                    alert("上位の要素の極数が足りません");
                }
            } 
            return newTree;
        });
    }, []);

    const onDropLineNode = useCallback((cons: ConnectionMapProps, newItemValue: string) => {
        setTreeData(prevTree => {
            let ngFlag = false
            const newTree = JSON.parse(JSON.stringify(prevTree));
            const { node: targetNode, parent: parentNode, index} =  cons.type =="parenet" ? findNode(newTree, cons.parentNode.id):findNode(newTree, cons.childNode.id);
            if (targetNode) { 
                const newNode: TreeNode = { 
                    id: generateId(), 
                    type: 'decision', 
                    caption: newItemValue, 
                    note: '', 
                    children: [targetNode] 
                };
                if(parentNode){
                    const roots = ROOT_SELECT_OPTIONS.concat(Signals);
                    const targetDiagram = roots.find((diagram) => diagram.id == newItemValue);
                    const parentDiagram = roots.find((diagram) => diagram.id == parentNode?.caption);
                    if(targetDiagram && parentDiagram && targetDiagram?.wire > parentDiagram?.wire){
                        alert("上位の要素の極数が足りません");
                        ngFlag =true
                    }
                    if(targetDiagram && targetNode){
                         parentNode.children.forEach(childNode => {
                            
                            const childObjNode = roots.find((diagram) => diagram.id == childNode.caption);
                            if(!ngFlag && childObjNode && childObjNode.wire>targetDiagram.wire){
                                alert("下位の要素の極数が多すぎます");
                                ngFlag =true
                            }
                        });

                    }
                    if(!ngFlag){
                        if(targetDiagram && parentDiagram){

                            if(cons.type =="child"){
                                parentNode.children[index] = newNode;
                            }
                            else if(cons.type =="parent"){
                                newNode.children = parentNode.children
                                parentNode.children = [newNode];
                            }
                            
                            saveTreeDataToLocalStorage(newTree);
                        
                        }else{
                            alert("上位の要素の極数が足りません");
                        }
                    }


                }
            } 
            return newTree;
        });
    }, []);

    const onRemove = useCallback((id: string) => {
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
    const handleSelect = useCallback((nodeId: string, value: string,treeData:TreeNode[]) => {
            const { node: targetNode, parent: parentNode, index}= findNode(treeData, nodeId);
            const roots = ROOT_SELECT_OPTIONS.concat(Signals);
            const targetDiagram = roots.find((diagram) => diagram.id == value);
            const parentDiagram = roots.find((diagram) => diagram.id == parentNode?.caption);
            let ngFlag = false
            if(targetDiagram && parentDiagram && targetDiagram?.wire > parentDiagram?.wire){
                alert("上位の要素の極数が足りません");
                ngFlag =true
            }
            if(targetDiagram && targetNode){
                targetNode.children.forEach(childNode => {
                    const childObjNode = roots.find((diagram) => diagram.id == childNode.caption);
                    if(!ngFlag && childObjNode && childObjNode.wire>targetDiagram.wire){
                        alert("下位の要素の極数が多すぎます");
                        ngFlag =true
                    }
                });

            }
            if(!ngFlag){
                updateNode(nodeId, 'caption', value);

            }
            ngFlag =false
         },[updateNode]);
    const openNoteModal = useCallback((id: string, currentNote: string) => setNoteModalState({ isOpen: true, nodeId: id, currentNote }), []);
    const handleNoteSave = useCallback((nodeId: string, note: string) => {
         updateNode(nodeId, 'note', note); 
         setNoteModalState({ isOpen: false, nodeId: null, currentNote: '' }); 
        }, [updateNode]);
    const handleReset = () => { if (window.confirm("全てのデータをリセットしますか？")) { setTreeData(INITIAL_TREE_DATA); saveTreeDataToLocalStorage(INITIAL_TREE_DATA); } };


    const getDownloadFile = async (extType: FileExtensionType) =>{
        try {
            const params = new URLSearchParams();
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
            const blob = new Blob([response.data], { type: `${extType.type};charset=Shift_JIS` });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = extType.text +extType.ext; 
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
                <div style={{ marginBottom: '0.5rem', textAlign: 'right' ,display: 'flex',}}>
                    <ResetButton onClick={handleReset}>リセット</ResetButton>
                    <SvgButton 
                        onClick={(e) => {
                            e.stopPropagation(); 
                            getDownloadFile(extSVG);
                        }}
                        tabIndex={0}>SVG保存</SvgButton>
                    <SvgButton 
                        onClick={(e) => {
                            e.stopPropagation(); 
                            getDownloadFile(extDXF);
                        }}
                        tabIndex={0}>DXF保存</SvgButton>
                </div>
                <EditorLayout>
                    <NodePalette />
                    <CanvasLayout>

                        {treeData.length > 0 ? 
                            <TreeDisplay 
                                nodes={treeData} 
                                updateNode={updateNode} 
                                onRemove={onRemove} 
                                openSelectModal={openSelectModal} 
                                openNoteModal={openNoteModal} 
                                onDropNode={onDropNode} 
                                onDropLineNode={onDropLineNode}
                            /> 
                            : <div style={{ textAlign: 'center', padding: '100px' }}>Loading...</div>
                        }
                    </CanvasLayout>
                </EditorLayout>
            <DecisionSelectModal 
                state={selectModalState} 
                onSelect={handleSelect} 
                onClose={() => setSelectModalState({ isOpen: false, nodeId: null, currentValue: '', isRoot: false })}
                treeData = {treeData}
                  />
            <NoteEditorModal state={noteModalState} onSave={handleNoteSave} onClose={() => setNoteModalState({ isOpen: false, nodeId: null, currentNote: '' })} />
        </StyledContentContainer>
    </PageLayout>
    );
};

export default App;