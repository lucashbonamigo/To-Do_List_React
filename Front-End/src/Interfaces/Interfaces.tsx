export interface IHead {
    method: string;
    headers: { "Content-Type": string };
    body?: string
}

export interface Iresponse {
    id: number,
    user: string,
    pass: string
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