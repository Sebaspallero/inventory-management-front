import API from "@/lib/axios";

type LoginRequest = {
    email: string;
    password: string;
};

type LoginResponse = {
    token: string;
    username: string;
    role: string;
};

type RegisterRequest = {
    username: string;
    email: string;
    password: string;
    role: string;
}

type RegisterResponse = {
    token: string;
    username: string;
    role: string;
}

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