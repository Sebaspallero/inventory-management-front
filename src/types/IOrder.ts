import { IOrderItemRequest, IOrderItemResponse } from "./IOrderItem";

export interface IOrderResponse {
    id: number;
    orderNumber: string;
    orderDate: string;
    supplierId: number;
    supplierName: string;
    items: IOrderItemResponse[];
}

export interface IOrderRequest {
    supplierId: number;
    items: IOrderItemRequest[];
}

export interface IOrdersByMonth {
    name: string;
    value: number;
}

