export interface RegisterRequest {
    username: string
    email: string
    password: string
}

export interface LoginRequest {
    email: string
    password: string
}

export interface AuthResponse {
    token: string;
    user: User

}

export interface User {
    created_at: string;
    email: string;
    id: string;
    is_verified: boolean;
    public_key: string;
    updated_at: string;
    username: string;
}


export type UserData = {
    status: number;
    message: string;
    data: { user: User }
}
