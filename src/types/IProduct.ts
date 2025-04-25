export interface IProductResponse {
    id: number,
    name: string,
    description: string,
    stock: number,
    price: number,
    categoryName: string,
    categoryId: number,
    supplierName: string,
    supplierId: number,
    createdAt: string,
    updatedAt: string
}

export interface IProductRequest {
    name: string,
    description: string,
    stock: number,
    price: number,
    categoryId: number,
    supplierId: number
}
