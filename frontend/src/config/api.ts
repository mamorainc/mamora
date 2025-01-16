export const API_CONFIG = {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000',
    version: 'v1',
    endpoints: {
        wallet: '/user/wallet',
    },
} as const;