import API from "@/lib/axios";
import { ICategoryRequest } from "@/types/ICategory";

export const getAllCategories = async () => {
    const response = await API.get("/categories");
    return response.data;
}

export const getAllPaginatedCategories = async (page: number, size: number) => {
    const response = await API.get(`/categories/paginated?page=${page}&size=${size}`)
    return response.data;
}

export const searchCategoriesByName = async (name: string, page: number, size: number) => {
    const response = await API.get(`/categories/search?name=${name}&page=${page}&size=${size}`);
    return response.data;
};


export const saveCategory = async (category: ICategoryRequest) => {
    const response = await API.post("/categories", category);
    return response.data;
}

export const updateCategory = async (id: number, category: ICategoryRequest) => {
    const response = await API.put(`/categories/${id}`, category);
    return response.data;
}

export const deleteCategory = async (id: number) => {
    const response = await API.delete(`/categories/${id}`);
    return response.data;
}

export const exportCategoriesToExcel = async () => {
    const response = await API.get('/export/categories', {
      responseType: 'blob',
    });
  
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'categorias.xlsx');
    document.body.appendChild(link);
    link.click();
    link.remove();
};


