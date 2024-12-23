import { Message, UserMessage } from "@/types/chat";
import { create } from "zustand";

type Store = {
    messages: (Message | UserMessage)[];
    addUserMessage: (message: UserMessage) => void;
    addChatMessage: (message: Message) => void;
    id: string | null;
    setId: (id: string) => void;
    botReplyId: string | null;
    setBotReplyId: (id: string | null) => void;
    latestBotNotRepliedMessage: {
        content: string | null
    }
    setLatestBotNotRepliedMessage: (message: string | null) => void;

};


export const useChatStore = create<Store>()((set) => ({
    id: null,
    setId: (id: string) => set({ id }),
    messages: [],
    addUserMessage: (message) => {
        set((state) => ({
            messages: [...state.messages, message]
        }))
    },
    addChatMessage: (message) => {
        set((state) => ({
            messages: [...state.messages, message]
        }))
    },
    botReplyId: null,
    setBotReplyId: (id) => set({ botReplyId: id }),
    latestBotNotRepliedMessage: {
        content: ''
    },
    setLatestBotNotRepliedMessage: (message) => set({ latestBotNotRepliedMessage: { content: message } }),
}));
