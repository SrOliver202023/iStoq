export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};


export type Supplier = {
    id: number
    nameSupplier: string
    email: string
    cnpj: string
    phone: string
    address: string
}

export type SupplierDTO = {
    nameSupplier: string
    email: string
    cnpj: string
    phone: string
    address: string
}

export type SuppliersProps = {
    suppliers: Supplier[]
}
export type SupplierProps = {
    supplier: Supplier
}

export type SuppliersPaginationProps = {
    suppliers: Pagination<Supplier>
}

export type Pagination<T> = {
    current_page: number;
    data: T[]
    first_page_url: string
    from: number
    last_page: number
    last_page_url: string
    links: Link[]
    next_page_url: string
    path: string
    per_page: number
    prev_page_url: any
    to: number
    total: number
}

export interface Link {
    url?: string
    label: string
    active: boolean
}

