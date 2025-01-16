import { ApiClient } from '@/lib/api/client';
import { Chat } from '@/types/chat';
import { API_CONFIG } from '@/config/api';
import logger from '@/lib/logger';
import { ApiError } from '@/lib/api/errors';

export class ChatService {
  private apiClient: ApiClient;

  constructor(userId?: string) {
    this.apiClient = new ApiClient(API_CONFIG.baseUrl, {
      ...(userId && { 'x-user-id': userId }),
    });
  }

  async getChats(): Promise<Chat[]> {
    logger.info('Fetching chats');
    
    try {
      const data = await this.apiClient.request<Chat[]>(
        API_CONFIG.endpoints.chats,
        {
          method: 'GET',
          cache: 'no-store',
          next: {
            tags: ['chats'],
          },
        }
      );
      
      return data;
    } catch (error) {
      logger.error('Failed to fetch chats:', error);
      throw error instanceof ApiError 
        ? error 
        : new ApiError('Failed to fetch chats', 500);
    }
  }
}