export type ApiResponse<T> = {
    statusMessage: string
    data: T | null
    error?: string | null
}

