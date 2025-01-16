import { ApiClient } from '@/lib/api/client';
import { WalletData } from '@/types/wallet';
import logger from '@/lib/logger';
import { API_CONFIG } from '@/config/api';

export class WalletService {
    private apiClient: ApiClient;

    constructor(userId: string) {
        this.apiClient = new ApiClient(API_CONFIG.baseUrl, {
            'x-user-id': userId,
        });
    }

    async getWalletData(chain: string = 'mainnet'): Promise<WalletData> {
        logger.info(`Fetching wallet data for chain: ${chain}`);

        try {
            return await this.apiClient.request<WalletData>(
                API_CONFIG.endpoints.wallet,
                {
                    method: 'GET',
                },
                { chain },
            );
        } catch (error) {
            logger.error('Failed to fetch wallet data:', error);
            throw error;
        }
    }
}
