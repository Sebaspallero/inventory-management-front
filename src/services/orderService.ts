import API from "@/lib/axios";
import { IPagedResponse } from "@/types/IPagedResponse";
import { IOrderResponse } from "@/types/IOrder";
import { IOrderRequest } from "@/types/IOrder";

interface OrderFilterParams {
  page: number;
  size: number;
  orderNumber?: string;
  supplierId?: number;
  startDate?: string;
  endDate?: string;
}

export const getFilteredOrders = async (params: OrderFilterParams): Promise<IPagedResponse<IOrderResponse>> => {
  const queryParams = new URLSearchParams();

  queryParams.append("page", params.page.toString());
  queryParams.append("size", params.size.toString());

  if (params.orderNumber) queryParams.append("orderNumber", params.orderNumber);
  if (params.supplierId) queryParams.append("supplierId", params.supplierId.toString());
  if (params.startDate) queryParams.append("startDate", params.startDate);
  if (params.endDate) queryParams.append("endDate", params.endDate);

  const response = await API.get(`/orders/search?${queryParams.toString()}`);
  return response.data;
};

export const saveOrder = async (order: IOrderRequest) => {
  const response = await API.post("/orders", order);
  return response.data;
}

export const deleteOrder = async (iderId: number) => {
  const response = await API.delete(`/orders/${iderId}`);
  return response.data;
}

export const getOrdersPerMonth = async () => {
  const response = await API.get("/orders/orders-per-month");
  return response.data;
}

export const exportOrdersToExcel = async () => {
    const response = await API.get('/export/orders', {
      responseType: 'blob',
    });
  
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'ordenes.xlsx');
    document.body.appendChild(link);
    link.click();
    link.remove();
};

export const exportOrderDetailsToPDF = async (orderId: number) => {
  const response = await API.get(`/export/orders/${orderId}/export-pdf`, {
    responseType: 'blob',
  });

  const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `orden_${orderId}.pdf`);
  document.body.appendChild(link);
  link.click();
  link.remove();
};

