const storage = localStorage;

export function getLocalStorage(key: string){
    return storage.getItem(key);
}

export function changeLocalStorage(key: string, value: boolean){
    storage.setItem(key, JSON.stringify(value));
}

export function changeLocalStorageTab(key: string, value: string){
    storage.setItem(key, JSON.stringify(value));
}

export function insertToken(key: string, value: string){
    storage.setItem(key, value);
}