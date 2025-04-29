import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteSupplier, exportSuppliersToExcel, getAllPaginatedSuppliers, getAllSuppliers, saveSupplier, updateSupplier, searchSupplierByName } from "@/services/supplierService";
import { IPagedResponse } from "@/types/IPagedResponse";
import { ISupplierRequest, ISupplierResponse } from "@/types/ISupplier";

export const useSuppliers = () => {
    return useQuery<ISupplierResponse[]>({
        queryKey: ["suppliers"],
        queryFn: () => getAllSuppliers(),
        refetchOnWindowFocus: false,
        refetchInterval: 60000,
        placeholderData: keepPreviousData,
    })
}

export const useFilteredSuppliers = (page: number, size: number, search: string) => {
  const trimmedSearch = search.trim();
  const shouldSearch = trimmedSearch.length > 2;

  const queryKey = ['suppliers', { page, size, search: trimmedSearch }];

  const queryFn = () => {
    if (shouldSearch) {
      return searchSupplierByName(trimmedSearch, page, size);
    }
    return getAllPaginatedSuppliers(page, size);
  };

  return useQuery<IPagedResponse<ISupplierResponse>>({
    queryKey,
    queryFn,
    refetchOnWindowFocus: false,
    refetchInterval: 60000,
    placeholderData: keepPreviousData,
    staleTime: 300000,
  });
};

export const useSaveSupplier = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (newSupplier: ISupplierRequest) => saveSupplier(newSupplier),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['suppliers'] });
        },
    });
}

export const useUpdateSupplier = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, supplier }: { id: number; supplier: ISupplierRequest }) => updateSupplier(id, supplier),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['suppliers'] });
        },
    });
};

export const useDeleteSupplier = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => deleteSupplier(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['suppliers'] });
        },
    });
}

export const useExportSuppliers = () => {
    return useMutation({
        mutationFn: exportSuppliersToExcel,
    });
};