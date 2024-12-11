export interface CreateLocation {
    name:string;
    status:boolean;
}

export interface GetLocation {
    id: number;
    name: string;
    status: boolean;
    created_at: string;
    updated_at: string;
}