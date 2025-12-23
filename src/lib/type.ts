export interface TreeNode {
    id: string;
    device: Device;
    children: TreeNode[]; 
}

export interface Device{
    type: string;
    caption: string;
    specification: Specification;
}

export type Specification = 
Power | Dev | Sw | OffDelaySw | OnDelaySw | OnDelayOffDelaySw | MagnetSwitch | CircuitBreaker |
 Coil | Thermal | TouthSensor | ProximitySwitch | Fuze | Motor | ThermoCouple | 
 Lamp | Buzzer | Elb | Trans | PowerSupply;

export interface Power extends Parts{
    type: "POWER";
    volt:number;
    phase:string;
    amp: number;
}
//-----------------------------------------
interface Parts{
    modelNumber: string;
    maker:string;
    signature: string;
    signatureNumber:string,
    note:string,

}
export interface Dev extends Parts{
    type: "DEVICE";
    amp: number;
}

export interface Sw extends Parts{
    type: "SW";
}

export interface OffDelaySw extends Parts{
    type: "OFFDELAYSW";
    OffDelay:number;
}
export interface OnDelaySw extends Parts{
    type: "ONDELAYSW";
    OnDelay:number;
}
export interface OnDelayOffDelaySw extends Parts{
    type: "ONDELAYOFFDELAYSW";
    OffDelay:number;
    OnDelay:number;
}
export interface MagnetSwitch extends Parts{
    type: "MC";
    amp: number;
}

export interface CircuitBreaker extends Parts{
    type: "CP";
    amp: number;
}

export interface Coil extends Parts{
    type: "COIL";
}

export interface Thermal extends Parts{
    type: "THR";
    ampTemp: number;
}

export interface TouthSensor extends Parts{
    type: "TS";
}

export interface ProximitySwitch extends Parts{
    type: "AP";
}

export interface Fuze extends Parts{
    type: "FZ";
    ampLimit:number;
}

export interface Motor extends Parts{
    type: "M";
    watt:number;
}

export interface ThermoCouple extends Parts{
    type: "TC";
}

export interface Lamp extends Parts{
    type: "PL";
    color:string;
}

export interface Buzzer extends Parts{
    type: "BZ";
}

export interface Elb extends Parts{
    type: "ELB";
    amp: number;
    sensitivity: number;
}

export interface Trans extends Parts{
    type: "TR";
    splyVolt:number;
    convVolt:number;
    watt_w:number;
}

export interface PowerSupply extends Parts{
    type: "PS";
    splyVolt:number;
    convVolt:number;
    watt_w:number;
}

export interface LayoutNode extends TreeNode {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface SelectOption {
    id:  string;
    search?: string;
    caption?: string;
    did?: string;
    discription?: string;
    color?: string;
    wire:number;
    device?:Device;
}
export interface SVGConnectionProps {
    parent: LayoutNode;
    child: LayoutNode;
    color: string;
    childLen:number;
    
}

export interface NodeRendererProps {
    node: LayoutNode;
    onRemove: (id: string) => void;
    isRoot: boolean;
    openSelectModal: (
        id: string, currentValue: string, isRoot: boolean) => void;
    openNoteModal: (
        id: string,
        device: Device) => void; 
    onDropNode: (targetId: string, newItemValue: string) => void;
}

export interface ConnectionMapProps {
    id: string;
    type: string;
    parentNode: LayoutNode;
    childNode: LayoutNode;
    code: string;
    color: string;
    x:number;
    y:number;
    width:number;
    height:number;
}
export interface ConnectionRendererProps {
    cons: ConnectionMapProps;
    onDropLineNode: (targetId: ConnectionMapProps, newItemValue: string) => void;
}
export interface CustomSelectFieldProps { 
    nodeId: string;
    value: string; 
    onTriggerOpen: (id: string, currentValue: string, isRoot: boolean) => void;
    options: SelectOption[];
    isRoot: boolean;
    device: Device;
}



export interface NoteModalState {
    isOpen: boolean;
    nodeId: string | null;
    device: Device;
}

export interface NoteEditorModalProps {
    state: NoteModalState;
    onSave: (
        nodeId: string, 
        device: Device) => void;
    onClose: () => void;
}
export interface SelectModalState {
    isOpen: boolean;
    nodeId: string | null;
    currentValue: string;
    isRoot: boolean;
}
export interface SelectTableModalState{
    isOpen: boolean;
}
export interface DecisionSelectModalProps {
    state: SelectModalState;
    onSelect: (nodeId: string, value: string,treeData:TreeNode[]) => void;
    onClose: () => void;
    treeData: TreeNode[];
}
export interface DecisionSelectTableModalProps {
    state: SelectTableModalState;
    onClose: () => void;
    treeData: TreeNode[];
}

export interface TreeModalProps {
    treeData: TreeNode[];
}


export interface TreeDisplayProps {
    nodes: TreeNode[];
    onRemove: (id: string) => void;
    openSelectModal: (id: string, currentValue: string, isRoot: boolean) => void;
    openNoteModal: (
        id: string, 
        device: Device) => void;
    onDropNode: (targetId: string, newItemValue: string) => void;
    onDropLineNode: (targetId: ConnectionMapProps, newItemValue: string) => void;
}

export const baseColors = {
    primary: '#1d4ed8',
    primaryLight: '#3b82f6',
    lineColor: '#1d4ed8', 
    background: '#f8fafc',
    card: '#ffffff',
    editorBg: '#ffffff',
    success: '#059669',
    warning: '#f59e0b',
    danger: '#dc2626',
    default: '#64748b',
    info: '#3b82f6',
};

// src/lib/data/label.ts
export interface Label {
  [name: string]: string;
}
// src/app/components/LayoutComponents.tsx
export interface LayoutProps {
    children: React.ReactNode;
}

// src/app/components/ActiveLink.tsx
export interface ActiveLinkProps {
    href: string;
    label: string;
}

// src/app/components/BlogCatalog.tsx
interface Article {
    slug: string;
    title: string;
    summary: string;
    date: string; 
    tag: string[];
    image: string | null;
}
export interface BlogCatalogProps {
    initialArticles: Article[]; 
}

// src/app/components/BlogTag.tsx
export interface BlogTagsProps {
    tag: string[]; // タグ名（文字列）の配列
}

// src/app/components/ClientTagFilter.tsx
export interface ArticleItem {
    slug: string; title: string; summary: string; date: string; image: string; tag: string[];
}

// src/app/components/SymbolCatalog.tsx
export interface Picture {
    id: string;
    caption: string;
    subcaption: string;
    did: string;
    discription: string; 
    search: string; 
    wire:number;
}
export interface FileExtensionType {
    ext: string;
    type: string;
    text: string;
    url: string;
}

// src/app/blog/[slug]/ArticleClient.tsx
export interface ArticleBodyProps {
    htmlContent: string;
}

// src/app/blog/[slug]/TableOfContents.tsx
interface Heading {
    level: number;
    text: string;
    id: string;
}
export interface TableOfContentsProps {
    headings: Heading[];
}

// src/app/components/Table.tsx

export interface PartsList{
    maker:string;
    modelNumber:string;
    amount:number;
    note:string;
    [key: string]: string | number | boolean | null | undefined;
}