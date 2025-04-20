import API from "@/lib/axios";


export const getTotalInventory = async () => {
    const response = await API.get("/products/total-inventory");
    return response.data;
}

export const getSuppliersCount = async () => {
    const response = await API.get("suppliers/count");
    return response.data;
}

export const getProductsWithLessStockThan = async (threshold: number) => {
    const response = await API.get(`/products/stock/less/${threshold}`);
    return response.data.length;
}

export const getOrdersMonthly = async () => {
    const response = await API.get("/orders/monthly");
    return response.data;
}

export const getAllProducts = async () => {
    const response = await API.get("/products/products-by-category");
    return response.data;
}