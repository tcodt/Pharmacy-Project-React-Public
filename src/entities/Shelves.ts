export interface CreateShelves{
    name: string;
    location_ids: number[];
    capacity: number;
    status: boolean;
}

export interface GetAllShelves{
    id:number;
    name: string;
    location: string[];
    capacity: number;
    status: boolean;
    created_at: string;
    updated_at: string;
    is_full: boolean;
}