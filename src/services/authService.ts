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

export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await API.post("/auth/login", credentials);
    return response.data;
};