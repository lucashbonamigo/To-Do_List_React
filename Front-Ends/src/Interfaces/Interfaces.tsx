export interface IHead{
    method: string;
    headers:{ "Content-Type": string}; 
    body?: string 
}

export interface Iresponse{
    message: string,
    user:{
        id: number,
        name: string
    }
}

export interface IPostbody {
    usuario?: string,
    pass?: string
    novaTarefa?: string,
    deadline?: string,
    userID?: number,
    states?: boolean
}

export interface ITask{
    id: number,
    task: string,
    status: boolean | number
}