import { useQuery, keepPreviousData, useMutation, useQueryClient  } from "@tanstack/react-query";

import { getAllProducts, getAllPaginatedProducts, saveProduct, deleteProduct, updateProduct, exportProductsToExcel, searchProductsByName, getProductsBySupplier  } from "@/services/productsService";
import { IPagedResponse } from "@/types/IPagedResponse";
import { IProductResponse, IProductRequest } from "@/types/IProduct";

export const useProducts = () => {
  return useQuery<IProductResponse[]>({
    queryKey: ["products"],
    queryFn: () => getAllProducts(),
    refetchOnWindowFocus: false,
    refetchInterval: 60000,
  });
}

export const useFilteredProducts = (page: number, size: number, category: number | null, search: string) => {
  const trimmedSearch = search.trim();
  const shouldSearch = trimmedSearch.length > 2;

  const queryKey = ['products', { page, size, category, search: trimmedSearch }];

  const queryFn = () => {
    if (shouldSearch) {
      return searchProductsByName(trimmedSearch, page, size);
    }
    return getAllPaginatedProducts(page, size, category);
  };

  return useQuery<IPagedResponse<IProductResponse>>({
    queryKey,
    queryFn,
    refetchOnWindowFocus: false,
    refetchInterval: 60000,
    placeholderData: keepPreviousData,
    staleTime: 300000,
  });
};

export const useFilteredProductsBySupplier = (supplierId: number | null) => {
  const query = useQuery<IProductResponse[] | null>({
    queryKey: ['products', supplierId],
    queryFn: () => (supplierId ? getProductsBySupplier(supplierId) : Promise.resolve(null)),
    refetchOnWindowFocus: false,
    refetchInterval: 60000,
    enabled: supplierId !== null,
  });

  return query;
};



export const useSaveProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newProduct: IProductRequest) => saveProduct(newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, product }: { id: number; product: IProductRequest }) => updateProduct(id, product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

export const useExportProducts = () => {
  return useMutation({
    mutationFn: exportProductsToExcel,
  });
};
