import { useQuery, keepPreviousData  } from "@tanstack/react-query";

import { getAllProducts, getAllPaginatedProducts } from "@/services/productsService";


interface Product {
    id: number,
    name: string,
    description: string,
    stock: number,
    price: number,
    categoryName: string,
    supplierName: string,
    createdAt: string,
    updatedAt: string
}

interface PagedResponse<T> {
  content: T[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export const useProducts = () => {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: () => getAllProducts(),
    refetchOnWindowFocus: false,
    refetchInterval: 60000,
  });
}

export const usePaginatedProducts = (page: number, size: number, category: number | null) => {
  return useQuery<PagedResponse<Product>>({
    queryKey: ["products", page, size, category],
    queryFn: () => getAllPaginatedProducts(page, size, category),
    refetchOnWindowFocus: false,
    refetchInterval: 60000,
    placeholderData: keepPreviousData,
  });
};