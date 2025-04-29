import API from "@/lib/axios";
import { IProductRequest } from "@/types/IProduct";

export const getAllProducts = async () => {
    const response = await API.get("/products");
    return response.data;
}

export const getAllPaginatedProducts = async (page: number, size: number, category?: number | null) => {
    if(category != null) {
        const response = await API.get(`/products/category/${category}`)
        return response.data;
    }else{
        const response = await API.get(`/products/paginated?page=${page}&size=${size}`)
        return response.data;
    }
}

export const getProductsBySupplier = async (supplierId: number) => {
    const response = await API.get(`/products/supplier/${supplierId}`)
    return response.data;
}

export const saveProduct = async (product: IProductRequest) => {
    const response = await API.post("/products", product);
    return response.data;
}

export const deleteProduct = async (id: number) => {
    const response = await API.delete(`/products/${id}`);
    return response.data;
}

export const updateProduct = async (id: number, product: IProductRequest) => {
    const response = await API.put(`/products/${id}`, product);
    return response.data;
}

export const exportProductsToExcel = async () => {
    const response = await API.get('/export/products', {
      responseType: 'blob',
    });
  
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'productos.xlsx');
    document.body.appendChild(link);
    link.click();
    link.remove();
};

export const searchProductsByName = async (name: string, page: number, size: number) => {
    const response = await API.get(`/products/search?name=${name}&page=${page}&size=${size}`);
    return response.data;
};