import API from "@/lib/axios";

export const getAllCategories = async () => {
    const response = await API.get("/categories");
    return response.data;
}