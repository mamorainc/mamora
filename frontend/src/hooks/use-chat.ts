import { api } from "@/lib/axios"
import logger from "@/lib/logger"
import { useChatStore } from "@/stores/use-chat"
import { CreateChatResponse, Message, SendMessageDto, SendMessageResponse } from "@/types/chat"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"

export function useCreateChat() {
    return useMutation({
        mutationFn: async ({ userId }: { userId: string }) => {
            const response = await api.post<CreateChatResponse>('/api/v1/chat', {
                withCredentials: true
            }, {
                headers: {
                    'x-user-id': userId
                }
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
    const { data: session } = useSession()
    const userId = session?.user?.id
    const chatId = useChatStore((state) => state.id)
    return useQuery({
        queryKey: ['messages', { chatId: id || chatId }],
        queryFn: async () => {
            const response = await api.get<Message[]>(`/api/v1/chat/${id || chatId}`, {
                headers: {
                    'x-user-id': userId
                }
            })
            return response.data
        },
        enabled: !!id || !!chatId || !!userId,
        select: (data) => {
            return data.map((item) => ({
                ...item,
                bot_reply: {
                    ...item.bot_reply,
                    content: item.bot_reply.content === "" ? { type: "message", data: "" } : JSON.parse(item.bot_reply.content),
                },
            }));
        },
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

export const useGetChats = () => {
    return useQuery({
        queryKey: ['chats'],
        queryFn: async () => {
            const response = await api.get<{ id: string, title: string, created_at: Date }[]>('/api/v1/chat')
            return response.data
        },
        enabled: true,
        select: (data) =>
            data.map((chat) => {
                const date = new Date(chat.created_at);
                const formattedTime = date.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                });
                const formattedDate = date.toLocaleDateString('en-US', {
                    month: '2-digit',
                    day: '2-digit',
                    year: 'numeric',
                });
                return {
                    ...chat,
                    created_at: `${formattedTime} - ${formattedDate}`,
                };
            }),
    })
}
