export interface IUserResponse {
    id: number;
    name: string;
    lastName: string;
    email: string;
    role: string;
    enabled: boolean;
}

export interface IUserRequest {
    name: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
}

export interface IUserUpdateRequest {
    id?: number;
    name: string;
    lastName: string;
    email: string;
    enabled: boolean;
    role: string;
}

export interface IUsersStats{
    totalUsers: number,
    totalAdmins: number,
    totalEmployees: number,
    totalUsersInLast30Days: number
}