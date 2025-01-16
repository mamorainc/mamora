export type ApiError = {
    message: string;
    status: number;
    code?: string;
};

export type ApiResponse<T> = {
    data: T;
    error: ApiError | null;
};