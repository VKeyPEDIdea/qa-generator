import QA_PROJECT_KEY from 'shared/enums/qaProjectKey';

export default function getProjectKeysFromStorage() {
    const keys = [];

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key?.includes(QA_PROJECT_KEY)) continue;
        keys.push(key);
    }

    return keys;
}