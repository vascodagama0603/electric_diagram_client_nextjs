export interface TreeNode {
    id: string;
    type: NodeType;
    caption: string;
    note: string;
    children: TreeNode[]; 
    
}

type NodeType = 'decision';

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
}
export interface SVGConnectionProps {
    parent: LayoutNode;
    child: LayoutNode;
    color: string;
}

export interface ConnectionMapProps {
    id: string;
    type: string;
    parentNode: LayoutNode;
    childNode: LayoutNode;
    code: string;
    color: string;
}
export interface CustomSelectFieldProps { 
    nodeId: string;
    value: string; 
    onTriggerOpen: (id: string, currentValue: string, isRoot: boolean) => void;
    options: SelectOption[];
    isRoot: boolean;
    note: string;
}

export interface NodeRendererProps {
    node: LayoutNode;
    onRemove: (id: string) => void;
    isRoot: boolean;
    openSelectModal: (id: string, currentValue: string, isRoot: boolean) => void;
    openNoteModal: (id: string, currentNote: string) => void; 
    // ★ Drag & Drop 用プロパティ
    onDropNode: (targetId: string, newItemValue: string) => void;
}


export interface NoteModalState {
    isOpen: boolean;
    nodeId: string | null;
    currentNote: string;
}

export interface NoteEditorModalProps {
    state: NoteModalState;
    onSave: (nodeId: string, note: string) => void;
    onClose: () => void;
}
export interface SelectModalState {
    isOpen: boolean;
    nodeId: string | null;
    currentValue: string;
    isRoot: boolean;
}

export interface DecisionSelectModalProps {
    state: SelectModalState;
    onSelect: (nodeId: string, value: string) => void;
    onClose: () => void;
}

export interface TreeDisplayProps {
    nodes: TreeNode[];
    updateNode: (id: string, field: 'caption' | 'note', value: string) => void;
    onRemove: (id: string) => void;
    openSelectModal: (id: string, currentValue: string, isRoot: boolean) => void;
    openNoteModal: (id: string, currentNote: string) => void;
    onDropNode: (targetId: string, newItemValue: string) => void;
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