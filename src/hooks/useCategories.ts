import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllCategories, getAllPaginatedCategories, searchCategoriesByName, saveCategory, updateCategory, deleteCategory, exportCategoriesToExcel } from "@/services/categoryService";
import { ICategoryRequest, ICategoryResponse } from "@/types/ICategory";
import { IPagedResponse } from "@/types/IPagedResponse";


export const useCategories = () => {
    return useQuery<ICategoryResponse[]>({
        queryKey: ["categories"],
        queryFn: () => getAllCategories(),
        refetchOnWindowFocus: false,
        refetchInterval: 60000,
    })
}

export const usePaginatedCategories = (page: number, size: number) => {
    return useQuery<ICategoryResponse[]>({
        queryKey: ["categories", page, size],
        queryFn: () => getAllPaginatedCategories(page, size),
        refetchOnWindowFocus: false,
        refetchInterval: 60000,
        placeholderData: keepPreviousData,
    })
}

export const useSaveCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (newCategory: ICategoryRequest) => saveCategory(newCategory),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
        },
    });
}


export const useUpdateCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, category }: { id: number; category: ICategoryRequest }) => updateCategory(id, category),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
        },
    });
};

export const useFilteredCategories = (page: number, size: number, search: string) => {
    const trimmedSearch = search.trim();
    const shouldSearch = trimmedSearch.length > 2;

    const queryKey = ['categories', { page, size, search: trimmedSearch }];

    const queryFn = () => {
        if (shouldSearch) {
            return searchCategoriesByName(trimmedSearch, page, size);
        }
        return getAllPaginatedCategories(page, size);
    };

    return useQuery<IPagedResponse<ICategoryResponse>>({
        queryKey,
        queryFn,
        refetchOnWindowFocus: false,
        refetchInterval: 60000,
        placeholderData: keepPreviousData,
        staleTime: 300000,
    });
};

export const useDeleteCategeory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => deleteCategory(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
        },
    });
}

export const useExportCategories = () => {
  return useMutation({
    mutationFn: exportCategoriesToExcel,
  });
};



