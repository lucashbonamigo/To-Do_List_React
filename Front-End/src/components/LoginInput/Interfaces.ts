export interface propFunc{
    labelInput: string, 
    value: any,//string | Date | Number | undefined, 
    onChange: (e: any) => void, 
    type: string
    width?: string
}