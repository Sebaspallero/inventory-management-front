import API from "@/lib/axios";
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "@/types/IAuth";



export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await API.post("/auth/login", credentials);
    return response.data;
};

export const register = async (data: RegisterRequest): Promise<RegisterResponse> => {
    const response = await API.post("/auth/register", data, {
      headers: {
        Authorization: undefined
      }
    });
    return response.data;
  };