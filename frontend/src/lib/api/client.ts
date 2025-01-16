import logger from '@/lib/logger';
import { API_CONFIG } from '@/config/api';
import { ApiError } from './errors';

type NextFetchOptions = {
    cache?: RequestCache;
    next?: {
        revalidate?: number | false;
        tags?: string[];
        abortSignal?: AbortSignal;
    };
};

type RequestOptions = {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    headers?: Record<string, string>;
    body?: unknown;
    cache?: NextFetchOptions['cache'];
    next?: NextFetchOptions['next'];
};


export class ApiClient {
    private baseUrl: string;
    private defaultHeaders: Record<string, string>;

    constructor(
        baseUrl: string = API_CONFIG.baseUrl,
        defaultHeaders: Record<string, string> = {}
    ) {
        this.baseUrl = baseUrl;
        this.defaultHeaders = {
            'Content-Type': 'application/json',
            ...defaultHeaders,
        };
    }

    private buildUrl(path: string, queryParams?: Record<string, string>): string {
        const url = new URL(`${this.baseUrl}/api/${API_CONFIG.version}${path}`);

        if (queryParams) {
            Object.entries(queryParams).forEach(([key, value]) => {
                if (value) url.searchParams.append(key, value);
            });
        }

        return url.toString();
    }

    private async handleResponse<T>(response: Response): Promise<T> {
        if (!response.ok) {
            const error = await response.json().catch(() => ({
                message: 'An unexpected error occurred',
            }));

            throw new ApiError(
                error.message || 'Request failed',
                response.status,
                error.code
            );
        }

        return response.json();
    }

    async request<T>(
        path: string,
        options: RequestOptions = {},
        queryParams?: Record<string, string>
    ): Promise<T> {
        const { method = 'GET', headers = {}, body } = options;

        try {
            const response = await fetch(this.buildUrl(path, queryParams), {
                method,
                headers: {
                    ...this.defaultHeaders,
                    ...headers,
                },
                body: body ? JSON.stringify(body) : undefined,
                cache: options.cache,
                next: options.next,
            });

            return this.handleResponse<T>(response);
        } catch (error) {
            logger.error(`API request failed: ${path}`, error);
            throw error;
        }
    }
}
