import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "@/services/categoryService";
import { ICategory } from "@/types/ICategory";


export const useCategories = () => {
    return useQuery<ICategory[]>({
        queryKey: ["categories"],
        queryFn: () => getAllCategories(),
        refetchOnWindowFocus: false,
        refetchInterval: 60000,
    })
}