import {TreeNode,PartsList} from '../../lib/type'

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
        const targetType = nodes[i].device.specification?.signature
        if(targetType in signatureNumbering){
            signatureNumbering[targetType] = signatureNumbering[targetType] + 1
        }else{
            signatureNumbering[targetType] = 1
        }
        nodes[i].device.specification.signatureNumber = String(signatureNumbering[targetType]).padStart(3, '0');
        getNode(nodes[i].children,signatureNumbering);
    }
    return
};

export const flatNode = (nodes: TreeNode[],plist:PartsList[]) => {
    for (let i = 0; i < nodes.length; i++) {
        const targetType = nodes[i].device.specification?.modelNumber
        const existPartsName = plist.find(parts => parts.modelNumber === targetType);
        if(existPartsName){
            existPartsName.amount = existPartsName.amount + 1;
            existPartsName.note =  existPartsName.note + "," + nodes[i].device.specification.signature+nodes[i].device.specification.signatureNumber;
        }
        else{
            if(targetType){
                const new_PartsList :PartsList ={
                        modelNumber:nodes[i].device.specification.modelNumber,
                        amount:1,
                        maker:nodes[i].device.specification.maker,
                        note:nodes[i].device.specification.signature+nodes[i].device.specification.signatureNumber,
                }
                plist.push(new_PartsList)
            }
        }
        flatNode(nodes[i].children, plist);
    }
};