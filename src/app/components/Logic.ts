import {TreeNode} from '../../lib/type'

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

export const getNode = (nodes: TreeNode[],signatureNumbering:{ [name: string]: number }) => {
    
    for (let i = 0; i < nodes.length; i++) {
        const targetType = nodes[i].device.specification.signature
        if(targetType in signatureNumbering){
            signatureNumbering[targetType] = signatureNumbering[targetType] + 1
        }else{
            signatureNumbering[targetType] = 1
        }
        nodes[i].device.specification.signatureNumber = String(signatureNumbering[targetType]).padStart(3, '0');
        getNode(nodes[i].children,signatureNumbering);
    }
    //console.log("NODE:",nodes)
    return
};