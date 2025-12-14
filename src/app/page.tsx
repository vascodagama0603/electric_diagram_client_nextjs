// app/page.tsx
'use client';

import axios from "axios";
import React, { useState, useCallback, useEffect, } from 'react';


import { PageLayout } from './components/LayoutComponents';
import { StyledContentContainer } from './../styles/GeneralStyles';
import {TreeNode,NoteModalState,SelectModalState,SelectOption} from '../lib/type'
import {loadTreeDataFromLocalStorage,saveTreeDataToLocalStorage} from '../lib/localStrage'
import {ResetButton,SvgButton} from './page_css'
import {TreeDisplay,DecisionSelectModal,NoteEditorModal,} from './components/Tree'
import {findNode,generateId, getNode} from './components/Logic'
import {NodePalette} from './components/TreePalette'
import { PageTitle, EditorLayout,CanvasLayout,
    StyledStatusContainer,
  Spinner,StatusText
} from '../styles/GeneralStyles';
import {FileExtensionType,ConnectionMapProps,Device} from '../lib/type'
import swal from 'sweetalert2';
import {Signals} from './../lib/data/signalsData'
import {baseColors} from './page_css'
import {SignalPropoerties} from './../lib/data/signalsProperty'

const ROOT_SELECT_OPTIONS: SelectOption[] = [
    { id: '3φ3w', caption: '3φ3w',  wire:3,color: baseColors.default },
    { id: '1φ2w', caption: '1φ2w', wire:2, color: baseColors.default },
];
const INITIAL_TREE_DATA: TreeNode[] = [
{
    "id": "root",
    "device": {
        "type": "POWER",
        "caption": "3φ3w",
        "specification": {
            "type": "POWER",
            "phase": "3φ3W",
            "volt": 200,
            "amp": 20,
            "signature": "POWER",
            "signatureNumber": "001"
        }
    },
    "children": [
        {
            "id": "8pbn9ug",
            "device": {
                "type": "",
                "caption": "S00144+S00287_3P",
                "specification": {
                    "modelNumber": "EW32AAG-3P030B",
                    "maker": "富士電機",
                    "signature": "ELB",
                    "signatureNumber": "001",
                    "type": "ELB",
                    "amp": 30,
                    "sensitivity": 30,
                    "note": ""
                }
            },
            "children": [
                {
                    "id": "wlwirhw",
                    "device": {
                        "type": "",
                        "caption": "S00284_3P",
                        "specification": {
                            "modelNumber": "SC09XG-E10",
                            "maker": "富士電機",
                            "signature": "MC",
                            "signatureNumber": "001",
                            "type": "MC",
                            "amp": 11,
                            "note": ""
                        }
                    },
                    "children": [
                        {
                            "id": "xmrj48y",
                            "device": {
                                "type": "",
                                "caption": "S00325_3P",
                                "specification": {
                                    "modelNumber": "TR18X3-009",
                                    "maker": "富士電機",
                                    "signature": "THR",
                                    "signatureNumber": "001",
                                    "type": "THR",
                                    "ampTemp": 30,
                                    "note": ""
                                }
                            },
                            "children": [
                                {
                                    "id": "pt2sltx",
                                    "device": {
                                        "type": "",
                                        "caption": "S00819_3P",
                                        "specification": {
                                            "modelNumber": "SF-PRV 2.2KW 4P 200V",
                                            "maker": "三菱電機",
                                            "signature": "M",
                                            "signatureNumber": "001",
                                            "type": "M",
                                            "watt": 2.2,
                                            "note": ""
                                        }
                                    },
                                    "children": []
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": "bf458dj",
                    "device": {
                        "type": "",
                        "caption": "S00060_3P",
                        "specification": {
                            "modelNumber": "FR-D720-3.7K",
                            "maker": "三菱電機",
                            "signature": "INV",
                            "signatureNumber": "001",
                            "type": "DEVICE",
                            "amp": 18,
                            "note": ""
                        }
                    },
                    "children": [
                        {
                            "id": "v4enfyx",
                            "device": {
                                "type": "",
                                "caption": "S00819_3P",
                                "specification": {
                                    "modelNumber": "SF-PRV 3.7KW 4P 200V",
                                    "maker": "三菱電機",
                                    "signature": "M",
                                    "signatureNumber": "002",
                                    "type": "M",
                                    "watt": 3.7,
                                    "note": ""
                                }
                            },
                            "children": []
                        }
                    ]
                }
            ]
        },
        {
            "id": "xv17kcm",
            "device": {
                "type": "",
                "caption": "S00287_2P",
                "specification": {
                    "modelNumber": "CP30-BA 2P 1-M 5A",
                    "maker": "三菱電機",
                    "signature": "CP",
                    "signatureNumber": "001",
                    "type": "CP",
                    "amp": 5,
                    "note": ""
                }
            },
            "children": [
                {
                    "id": "cj7wbo7",
                    "device": {
                        "type": "",
                        "caption": "S00060_2P",
                        "specification": {
                            "modelNumber": "S8VK-G12024",
                            "maker": "OMRON",
                            "signature": "AVR",
                            "signatureNumber": "001",
                            "type": "DEVICE",
                            "amp": 5,
                            "note": ""
                        }
                    },
                    "children": [
                        {
                            "id": "rqer9kv",
                            "device": {
                                "type": "",
                                "caption": "S00060_2P",
                                "specification": {
                                    "modelNumber": "KV-8000",
                                    "maker": "KEYENCE",
                                    "signature": "PLC-CPU",
                                    "signatureNumber": "001",
                                    "type": "DEVICE",
                                    "amp": 0,
                                    "note": ""
                                }
                            },
                            "children": []
                        },
                        {
                            "id": "4qj5nn6",
                            "device": {
                                "type": "",
                                "caption": "S00060_1P",
                                "specification": {
                                    "modelNumber": "KV-C64XC",
                                    "maker": "KEYENCE",
                                    "signature": "PLC-IN",
                                    "signatureNumber": "001",
                                    "type": "DEVICE",
                                    "amp": 0,
                                    "note": ""
                                }
                            },
                            "children": [
                                {
                                    "id": "cwczu77",
                                    "device": {
                                        "type": "",
                                        "caption": "S00254",
                                        "specification": {
                                            "modelNumber": "A16L-AGM-24D-1",
                                            "maker": "OMRON",
                                            "signature": "SW",
                                            "signatureNumber": "001",
                                            "type": "SW",
                                            "note": "運転ボタン[緑]"
                                        }
                                    },
                                    "children": []
                                },
                                {
                                    "id": "1pq1b4n",
                                    "device": {
                                        "type": "",
                                        "caption": "S00171+S00229",
                                        "specification": {
                                            "modelNumber": "A16L-ARM-24D-1",
                                            "maker": "OMRON",
                                            "signature": "SW",
                                            "signatureNumber": "002",
                                            "type": "SW",
                                            "note": "停止ボタン[赤]"
                                        }
                                    },
                                    "children": []
                                },
                                {
                                    "id": "bc37879",
                                    "device": {
                                        "type": "",
                                        "caption": "S00258",
                                        "specification": {
                                            "modelNumber": "A22-01M",
                                            "maker": "OMRON",
                                            "signature": "SW",
                                            "signatureNumber": "003",
                                            "type": "SW",
                                            "note": "非常停止ボタン"
                                        }
                                    },
                                    "children": []
                                }
                            ]
                        },
                        {
                            "id": "j4mgd04",
                            "device": {
                                "type": "",
                                "caption": "S00060_1P",
                                "specification": {
                                    "modelNumber": "KV-C64TD",
                                    "maker": "KEYENCE",
                                    "signature": "PLC-OUT",
                                    "signatureNumber": "001",
                                    "type": "DEVICE",
                                    "amp": 0,
                                    "note": ""
                                }
                            },
                            "children": [
                                {
                                    "id": "ox4th5f",
                                    "device": {
                                        "type": "",
                                        "caption": "S00305",
                                        "specification": {
                                            "modelNumber": "",
                                            "maker": "",
                                            "signature": "MC001-COIL",
                                            "signatureNumber": "001",
                                            "type": "COIL",
                                            "note": "モータ[M001]起動"
                                        }
                                    },
                                    "children": []
                                },
                                {
                                    "id": "moyhkjp",
                                    "device": {
                                        "type": "",
                                        "caption": "S00305",
                                        "specification": {
                                            "modelNumber": "",
                                            "maker": "",
                                            "signature": "MC002-COIL",
                                            "signatureNumber": "001",
                                            "type": "COIL",
                                            "note": "モータ[M002]起動"
                                        }
                                    },
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
const RESET_TREE_DATA: TreeNode[] = [
    {
        id: 'root',
        device:{
            type:"POWER",
            caption: ROOT_SELECT_OPTIONS[0].id,
            specification:{
                type:"POWER",
                phase:"3φ3W",
                volt:200,
                amp:20,
                signature: "POWER",
                signatureNumber:"01",
            },

        },
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
const useTreeUpdater1 = (setTreeData: React.Dispatch<React.SetStateAction<TreeNode[]>>) => {
    return useCallback(
        (id: string, field:Device) => {

            setTreeData(prevTree => {
                const newTree = JSON.parse(JSON.stringify(prevTree));
                const { node } = findNode(newTree, id);
                if (node) {
                    node.device = field
                }
                saveTreeDataToLocalStorage(newTree); 
                return newTree;
            });
        },
        [setTreeData]
    );
};


const useTreeUpdater2 = (setTreeData: React.Dispatch<React.SetStateAction<TreeNode[]>>) => {
    return useCallback(
        () => {
            
            setTreeData(prevTree => {
                const newTree = JSON.parse(JSON.stringify(prevTree));
                getNode(newTree,{});
                saveTreeDataToLocalStorage(newTree); 
                return newTree;
            });
        },
        [setTreeData]
    );
};
const App: React.FC = () => {
    const [treeData, setTreeData] = useState<TreeNode[]>([]);
    const [isMobile, setIsMobile] = useState(false);
    const [selectModalState, setSelectModalState] = useState<SelectModalState>({ isOpen: false, nodeId: null, currentValue: '', isRoot: false });
    const [noteModalState, setNoteModalState] = useState<NoteModalState>({
        isOpen: false,
        nodeId: "1", 
        device:{
            type:"POWER",
            caption: "",
            specification:{
                type:"POWER",
                phase:"3φ3W",
                volt:200,
                amp:20,
                signature: "POWER",
                signatureNumber:"01",}
        }
, });
    const [flags, setFlags] = useState<boolean>(false);
    const updateSpecification = useTreeUpdater1(setTreeData);
    const updateSignatureNumber = useTreeUpdater2(setTreeData);
    //console.log("treeData:",treeData)
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
                const parentDiagram = roots.find((diagram) => diagram.id == parentNode?.device.caption);
                const sigProp = SignalPropoerties.find((signal) => signal.id == newItemValue);
                if(targetDiagram && parentDiagram && targetDiagram?.wire <= parentDiagram?.wire && sigProp){
                    
                    const newNode: TreeNode = { 
                        id: generateId(), 
                        device:{
                            type:"",
                            caption: newItemValue, 
                            specification:sigProp?.specification,
                        },
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
        updateSignatureNumber()
    }, []);

    const onDropLineNode = useCallback((cons: ConnectionMapProps, newItemValue: string) => {
        setTreeData(prevTree => {
            let ngFlag = false
            const newTree = JSON.parse(JSON.stringify(prevTree));
            const { node: targetNode, parent: parentNode, index} =  cons.type =="parenet" ? findNode(newTree, cons.parentNode.id):findNode(newTree, cons.childNode.id);
            const sigProp = SignalPropoerties.find((signal) => signal.id == newItemValue);
            if (targetNode && sigProp) { 
                
                const newNode: TreeNode = { 
                    id: generateId(), 
                    device:{
                        type:targetNode.device.type,
                        caption: newItemValue, 
                        specification:sigProp?.specification,
                    },
                    children: [targetNode] 
                };
                if(parentNode){
                    const roots = ROOT_SELECT_OPTIONS.concat(Signals);
                    const targetDiagram = roots.find((diagram) => diagram.id == newItemValue);
                    const parentDiagram = roots.find((diagram) => diagram.id == parentNode?.device.caption);
                    if(targetDiagram && parentDiagram && targetDiagram?.wire > parentDiagram?.wire){
                        alert("上位の要素の極数が足りません");
                        ngFlag =true
                    }
                    if(targetDiagram && targetNode){
                         parentNode.children.forEach(childNode => {
                            
                            const childObjNode = roots.find((diagram) => diagram.id == childNode.device.caption);
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
            const parentDiagram = roots.find((diagram) => diagram.id == parentNode?.device.caption);
            let ngFlag = false
            if(targetDiagram && parentDiagram && targetDiagram?.wire > parentDiagram?.wire){
                alert("上位の要素の極数が足りません");
                ngFlag =true
            }
            if(targetDiagram && targetNode){
                targetNode.children.forEach(childNode => {
                    const childObjNode = roots.find((diagram) => diagram.id == childNode.device.caption);
                    if(!ngFlag && childObjNode && childObjNode.wire>targetDiagram.wire){
                        alert("下位の要素の極数が多すぎます");
                        ngFlag =true
                    }
                });

            }
            if((!ngFlag) && targetDiagram){
                //console.log("tergetDiagram:",targetDiagram)
                const sigProp = SignalPropoerties.find((signal) => signal.id == value);
                if (sigProp ){
                    const device = {
                        type:sigProp.specification.type,
                        caption: value, 
                        specification:sigProp?.specification,
                    }
                    updateSpecification(nodeId, device);
                    updateSignatureNumber();
                }

            }
            ngFlag =false
         },[updateSpecification,updateSignatureNumber]);

    const openNoteModal = useCallback((
        id: string, 
        device: Device) => 
            setNoteModalState({ 
                isOpen: true, 
                nodeId: id, 
                device:device}), []);

    const handleNoteSave = useCallback((
        nodeId: string, 
        device: Device) => {
            updateSpecification(nodeId, device);
            updateSignatureNumber();
            setNoteModalState({ 
                isOpen: false, 
                nodeId: null, 
                device: {
                    type:"",
                    caption:"",
                    specification:{
                        type:"POWER",
                        phase:"3φ3W",
                        volt:200,
                        amp:20,
                        signature: "POWER",
                        signatureNumber:"01"
                    }
                },
             }); 
        }, [updateSpecification,updateSignatureNumber]);
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
            <NoteEditorModal 
                state={noteModalState} 
                onSave={handleNoteSave} 
                onClose={() => setNoteModalState({ 
                    isOpen: false, 
                    nodeId: null, 
                    device:{
                        type:"",
                        caption:"",
                        specification:{
                            type:"POWER",
                            phase:"3φ3W",
                            volt:200,
                            amp:20,
                            signature: "POWER",
                            signatureNumber:"01",},
                    },})} />
        </StyledContentContainer>
    </PageLayout>
    );
};

export default App;