export interface Drugs {
    id: number,
    name: string,
    description: string,
    shelf: string,
    price: string,
    quantity:  number,
    manufacturer: string,
    expiration_date: string,
    status: boolean,
    created_at: string,
    category: number
}

export interface CreateDrugs {
    name: string,
    description: string,
    shelf_id: number,
    price: string,
    quantity:  number,
    manufacturer: string,
    expiration_date: string,
    status: boolean,
    category: number
}