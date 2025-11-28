import {TreeNode} from '../lib/type'
const STORAGE_KEY = 'DENKIZUMEN';

export const loadTreeDataFromLocalStorage = (): TreeNode[] => {
    if (typeof window === 'undefined') return [];
    try {
        const storedData = localStorage.getItem(STORAGE_KEY);
        if (storedData) {
            const parsed = JSON.parse(storedData);
            if (Array.isArray(parsed) && parsed.length > 0) {
                return parsed;
            }
        }
    } catch (e) {
        console.error("Failed to load tree data from localStorage, using initial data.", e);
    }
    return [];
};

export const saveTreeDataToLocalStorage = (data: TreeNode[]) => {
    if (typeof window === 'undefined') return;
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
        console.error("Failed to save tree data to localStorage.", e);
    }
};