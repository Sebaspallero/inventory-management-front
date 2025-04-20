import API from "@/lib/axios";

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