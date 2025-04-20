import { useQuery } from "@tanstack/react-query";

import { getTotalInventory } from "@/services/dashboardService";
import { getSuppliersCount } from "@/services/dashboardService";
import { getProductsWithLessStockThan } from "@/services/dashboardService";
import { getOrdersMonthly } from "@/services/dashboardService";
import { getAllProducts } from "@/services/dashboardService";


export const useTotalInventory = () => {
    return useQuery({
        queryKey: ["totalInventory"],
        queryFn: () => getTotalInventory(),
        refetchOnWindowFocus: false,
        refetchInterval: 60000,
    })
}

export const useSuppliersCount = () => {
    return useQuery({
        queryKey: ["suppliersCount"],
        queryFn: () => getSuppliersCount(),
        refetchOnWindowFocus: false,
        refetchInterval: 60000,
    })
}

export const useProductsWithLessStockThan = (threshold: number) => {
    return useQuery({
        queryKey: ["productsWithLessStockThan", threshold],
        queryFn: () => getProductsWithLessStockThan(threshold),
        refetchOnWindowFocus: false,
        refetchInterval: 60000,
    })
}

export const useOrdersMonthly = () => {
    return useQuery({
        queryKey: ["ordersMonthly"],
        queryFn: () => getOrdersMonthly(),
        refetchOnWindowFocus: false,
        refetchInterval: 60000,
    })
}

export const useAllProducts = () => {
    return useQuery({
        queryKey: ["allProducts"],
        queryFn: () => getAllProducts(),
        refetchOnWindowFocus: false,
        refetchInterval: 60000,
    })
}