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
      useTreeUpdater,findNode,generateId,
} from './components/Tree'
import {NodePalette} from './components/TreePalette'
import { PageTitle, EditorLayout,CanvasLayout,
    StyledStatusContainer,
  Spinner,StatusText
} from '../styles/GeneralStyles';
import {FileExtensionType,ConnectionMapProps} from '../lib/type'
import swal from 'sweetalert2';
import {Signals} from './../lib/data/signalsData'
import {baseColors} from './page_css'

const ROOT_SELECT_OPTIONS: SelectOption[] = [
    { id: '3φ3w', caption: '3φ3w',  wire:3,color: baseColors.default },
    { id: '1φ2w', caption: '1φ2w', wire:2, color: baseColors.default },
];
const INITIAL_TREE_DATA: TreeNode[] = [
    {
        "id": "root",
        "type": "decision",
        "caption": "3φ3w",
        "note": "3φ3W\n20A\n200V\n富士電機",
        "children": [
            {
                "id": "1",
                "type": "decision",
                "caption": "S00144+S00287_3P",
                "note": "ELB01\n30A30mA\n富士電機\nEW32AAG-3P030B",
                "children": [
                    {
                        "id": "2",
                        "type": "decision",
                        "caption": "S00284_3P",
                        "note": "MC01\n11A 2.2kW\n富士電機\nSC09XG-E10",
                        "children": [
                            {
                                "id": "3",
                                "type": "decision",
                                "caption": "S00325_3P",
                                "note": "THR01\n30A\n富士電機\nTR18X3-009",
                                "children": [
                                    {
                                        "id": "4",
                                        "type": "decision",
                                        "caption": "S00819_3P",
                                        "note": "M01\n2.2kW\n三菱電機\nSF-PRV \n2.2KW 4P 200V",
                                        "children": []
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": "cw6c6jz",
                        "type": "decision",
                        "caption": "S00284_3P",
                        "note": "MC02\n18A 3.7kW\n富士電機\nSC18XG-E10",
                        "children": [
                            {
                                "id": "w6anbkr",
                                "type": "decision",
                                "caption": "S00060_3P",
                                "note": "INV01\n3.kW\n三菱\nFR-D720-3.7K",
                                "children": [
                                    {
                                        "id": "1clebtg",
                                        "type": "decision",
                                        "caption": "S00819_3P",
                                        "note": "M02\n3.7kW\n三菱電機\nSF-PRV \n3.7KW 4P 200V",
                                        "children": []
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": "gzoa6an",
                        "type": "decision",
                        "caption": "S00287_2P",
                        "note": "CP01\n5A\n三菱\nCP30-BA 2P 1-M 5A",
                        "children": [
                            {
                                "id": "458mjfc",
                                "type": "decision",
                                "caption": "S00060_2P",
                                "note": "AVR01\n120W\nOMRON\nS8VK-G12024",
                                "children": [
                                    {
                                        "id": "r7biwas",
                                        "type": "decision",
                                        "caption": "S00060_2P",
                                        "note": "PLC-CPU01\nKEYENCE\nKV-8000",
                                        "children": []
                                    },
                                    {
                                        "id": "b05lyqx",
                                        "type": "decision",
                                        "caption": "S00060_1P",
                                        "note": "PLC-IN01\nKEYENCE\nKV-C64XC",
                                        "children": [
                                            {
                                                "id": "s0cvoww",
                                                "type": "decision",
                                                "caption": "S00254",
                                                "note": "PSW01\nOMRON\nA16L-AGM-24D-1\n運転ボタン[緑]",
                                                "children": []
                                            },
                                            {
                                                "id": "i4a9e10",
                                                "type": "decision",
                                                "caption": "S00171+S00229",
                                                "note": "PSW02\nOMRON\nA16L-ARM-24D-1\n停止ボタン[緑]",
                                                "children": []
                                            },
                                            {
                                                "id": "fu9fx0m",
                                                "type": "decision",
                                                "caption": "S00258",
                                                "note": "PSW03\nOMRON\nA165E-S-01\n非常停止ボタン",
                                                "children": []
                                            }
                                        ]
                                    },
                                    {
                                        "id": "zrtwhl4",
                                        "type": "decision",
                                        "caption": "S00060_1P",
                                        "note": "PLC-OUT01\nKEYENCE\nKV-C64TD",
                                        "children": [
                                            {
                                                "id": "8ducpt8",
                                                "type": "decision",
                                                "caption": "S00305",
                                                "note": "MC01\nモータ[M01]起動",
                                                "children": []
                                            },
                                            {
                                                "id": "dojpugi",
                                                "type": "decision",
                                                "caption": "S00305",
                                                "note": "MC02\nモータ[M01]起動",
                                                "children": []
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
]
const RESET_TREE_DATA: TreeNode[] = [
    {
        id: 'root',
        type: 'decision',
        caption: ROOT_SELECT_OPTIONS[0].id,
        note: '3φ3W\n20A\n200V', 
        children: [],
    },
];
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

const App: React.FC = () => {
    const [treeData, setTreeData] = useState<TreeNode[]>([]);
    const [isMobile, setIsMobile] = useState(false);
    const [selectModalState, setSelectModalState] = useState<SelectModalState>({ isOpen: false, nodeId: null, currentValue: '', isRoot: false });
    const [noteModalState, setNoteModalState] = useState<NoteModalState>({ isOpen: false, nodeId: null, currentNote: '' });
    const [flags, setFlags] = useState<boolean>(false);
    const updateNode = useTreeUpdater(setTreeData);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        let loadedData = loadTreeDataFromLocalStorage();
        if (!loadedData.length){
          loadedData = INITIAL_TREE_DATA
        }
        setTreeData(loadedData);
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
    const handleReset = () => { if (window.confirm("全てのデータをリセットしますか？")) { setTreeData(RESET_TREE_DATA); saveTreeDataToLocalStorage(INITIAL_TREE_DATA); } };


    const getDownloadFile = async (extType: FileExtensionType) =>{
        try {
            setFlags(true);
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
            const blob = new Blob([response.data], { type: `${extType.type};charset=utf-8` });
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
            }finally {
                setFlags(false);
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
                        {flags && (
                            <StyledStatusContainer>
                                <Spinner />
                                <StatusText>ダウンロード中...</StatusText>
                            </StyledStatusContainer>
                        )}
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