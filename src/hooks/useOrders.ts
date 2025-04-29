import { useQuery, keepPreviousData, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteOrder, exportOrderDetailsToPDF, exportOrdersToExcel, getFilteredOrders, getOrdersPerMonth, saveOrder } from "@/services/orderService";
import { IPagedResponse } from "@/types/IPagedResponse";
import { IOrderResponse, IOrdersByMonth } from "@/types/IOrder";
import { IOrderRequest } from "@/types/IOrder";

interface FilterParams {
    page: number;
    size: number;
    orderNumber?: string;
    supplierId?: number;
    startDate?: string;
    endDate?: string;
}

export const useFilteredOrders = (filters: FilterParams) => {
    
    return useQuery<IPagedResponse<IOrderResponse>>({
        queryKey: ['orders', filters],
        queryFn: () => getFilteredOrders(filters),
        placeholderData: keepPreviousData,
        refetchOnWindowFocus: false,
        refetchInterval: 60000,
        staleTime: 300000,
    });
};


export const useSaveOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newOrder: IOrderRequest) => saveOrder(newOrder),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}

export const useOrdersPerMonth = () => {
  return useQuery<IOrdersByMonth[]>({
    queryKey: ['monthly-orders'],
    queryFn: () => getOrdersPerMonth(),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    refetchInterval: 60000,
    staleTime: 300000,
});
}

export const useDeleteOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => deleteOrder(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
        },
    });
}

export const useExportOrders = () => {
    return useMutation({
        mutationFn: exportOrdersToExcel,
    });
};

export const useExportOrderPDF = () => {
    return useMutation({
      mutationFn: exportOrderDetailsToPDF,
    });
  };



