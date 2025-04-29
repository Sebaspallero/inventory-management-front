import API from "@/lib/axios";
import { ISupplierRequest } from "@/types/ISupplier";

export const getAllPaginatedSuppliers = async (page: number, size: number) => {
    const response = await API.get(`/suppliers/paginated?page=${page}&size=${size}`)
    return response.data;
}

export const getAllSuppliers = async () => {
    const response = await API.get("/suppliers");
    return response.data;
}


export const saveSupplier = async (supplier: ISupplierRequest) => {
    const response = await API.post("/suppliers", supplier);
    return response.data;
}

export const updateSupplier = async (id: number, supplier: ISupplierRequest) => {
    const response = await API.put(`/suppliers/${id}`, supplier);
    return response.data;
}

export const deleteSupplier = async (id: number) => {
    const response = await API.delete(`/suppliers/${id}`);
    return response.data;
}

export const searchSupplierByName = async (name: string, page: number, size: number) => {
    const response = await API.get(`/suppliers/search?name=${name}&page=${page}&size=${size}`);
    return response.data;
};

export const exportSuppliersToExcel = async () => {
    const response = await API.get('/export/suppliers', {
      responseType: 'blob',
    });
  
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'proveedores.xlsx');
    document.body.appendChild(link);
    link.click();
    link.remove();
};