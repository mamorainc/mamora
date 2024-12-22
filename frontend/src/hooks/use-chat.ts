import { api } from "@/lib/axios"
import logger from "@/lib/logger"
import { useChatStore } from "@/stores/use-chat"
import { CreateChatResponse, Message, SendMessageDto, SendMessageResponse } from "@/types/chat"
import { useMutation, useQuery } from "@tanstack/react-query"

export function useCreateChat() {
    return useMutation({
        mutationFn: async () => {
            const response = await api.post<CreateChatResponse>('/api/v1/chat', {
                withCredentials: true
            })
            return response.data
        },
        onSuccess: (response) => {
            logger.success('Chat created successfully', response)
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
            logger.error('Error creating chat', error)
        },
    })
}

export const useGetMessagesByChatId = (id?: string) => {
    const chatId = useChatStore((state) => state.id)
    return useQuery({
        queryKey: ['messages', { chatId: id || chatId }],
        queryFn: async () => {
            const response = await api.get<Message[]>(`/api/v1/chat/${id || chatId}`)
            return response.data
        },
        enabled: !!id || !!chatId,
    })
}

export const useSendMessage = () => {
    return useMutation({
        mutationFn: async (data: SendMessageDto) => {
            const response = await api.post<SendMessageResponse>(`/api/v1/chat/send-message`, data, {
                withCredentials: true
            })
            return response.data
        },
        mutationKey: ['sendMessage'],
        onSuccess: (response) => {
            logger.success('Message sent successfully', response)
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
            logger.error('Error sending message', error)
        },
    })
}

