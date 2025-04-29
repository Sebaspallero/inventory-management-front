export interface IOrderItemResponse {
    id: number,
    quantity: number,
    price: number,
    productName: string,
}

export interface IOrderItemRequest {
    quantity: number,
    productId: number,
}