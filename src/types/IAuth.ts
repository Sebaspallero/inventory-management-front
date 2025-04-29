export type LoginRequest = {
    email: string;
    password: string;
};

export type LoginResponse = {
    token: string;
    email: string;
    role: string;
    name: string;
    lastName: string;
};

export type RegisterRequest = {
    name: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
}

export type RegisterResponse = {
    token: string;
    email: string;
    role: string;
    name: string;
    lastName: string;
}