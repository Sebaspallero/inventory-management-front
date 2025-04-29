import API from "@/lib/axios";
import { IUserUpdateRequest } from "@/types/IUser";


export const getAllPaginatedUsers = async (page: number, size: number) => {
    const respnse = await API.get(`/users/paginated?page=${page}&size=${size}`);
    return respnse.data;
}

export const searchUserByName = async (name: string, page: number, size: number) => {
    const response = await API.get(`/users/search?name=${name}&page=${page}&size=${size}`);
    return response.data;
};

export const getUsersStats = async () => {
    const respnse = await API.get(`/users/stats`);
    return respnse.data;
}

export const deleteUser = async (id: number) => { 
    const response = await API.delete(`/users/${id}`);
    return response.data;
}

export const updateUser = async (id: number, user: IUserUpdateRequest) => {
    const response = await API.put(`/users/${id}`, user);
    return response.data;
}

export const exportUsersToExcel = async () => {
    const response = await API.get('/export/users', {
      responseType: 'blob',
    });
  
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'usuarios.xlsx');
    document.body.appendChild(link);
    link.click();
    link.remove();
};