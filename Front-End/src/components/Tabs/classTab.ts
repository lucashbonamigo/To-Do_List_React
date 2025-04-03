export class Tab{
    id: number;
    name: string;
    user_id : number;
    description?: string |undefined;

    constructor(name: string, user_id: number, description?:string, id?: number) {
        this.id = id || 0; // Default to 0 if id is not provided
        this.user_id = user_id
        this.name = name
        this.description = description
    }
}