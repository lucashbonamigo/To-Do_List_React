const localstrorage = localStorage;

export function getLocalStorage(valid: string){
    return localstrorage.getItem("LoginToDO");
}

export function changeLocalStorage(setLocal: string){
    localstrorage.setItem("LoginToDo", JSON.stringify(setLocal))
}

export function createLocalStorage(){
    localstrorage.setItem("LoginToDo","False");
}