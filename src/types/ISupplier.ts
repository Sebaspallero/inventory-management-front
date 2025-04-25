export interface ISupplier {
    id: number;
    name: string;
    contactEmail: string;
    phoneNumber: string;
    createdAt: string;
    updatedAt: string;
}

export interface ISupplierResponse {
    id: number;
    name: string;
    contactEmail: string;
    phoneNumber: string;
}

export interface ISupplierRequest {
    name: string;
    contactEmail: string;
    phoneNumber: string;
}