export interface IHead {
    method: string;
    headers: { 
        "Content-Type": string,
        "Authorization"?: string    
    };
    body?: string
}

export interface Iresponse {
    token: string
}

export interface IPostbody {
    usuario?: string,
    pass?: string
    novaTarefa?: string,
    deadline?: string,
    userID?: number | null,
    states?: boolean
}

export interface ITask {
    id: number,
    task: string,
    status: boolean | number
}