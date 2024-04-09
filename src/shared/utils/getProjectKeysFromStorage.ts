export default function getItemsListByKeyFromStorage(name: string) {
    const keys = [];

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key?.includes(name)) continue;
        keys.push(key);
    }

    return keys;
}