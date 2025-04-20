import { useQuery } from "@tanstack/react-query";

import { getAllCategories } from "@/services/categoryService";


interface Category {
    id: number,
    name: string,
    createdAt: string,
    updatedAt: string
}


export const useCategories = () => {
    return useQuery<Category[]>({
        queryKey: ["categories"],
        queryFn: () => getAllCategories(),
        refetchOnWindowFocus: false,
        refetchInterval: 60000,
    })
}