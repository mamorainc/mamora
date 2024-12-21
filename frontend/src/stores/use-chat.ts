import { create } from "zustand";

type Store = {
    messages: Message[];
    addMessage: (message: Message) => void;
    id: string | null;
    setId: (id: string) => void;
};
type Message = {
    id: string;
    role: "user" | "assistant";
    createdAt: Date;
    type: MessageType;
    data: unknown
};

enum MessageType {
    SWAP = "SWAP",
    PORTFOLIO_ANALYSIS = "PORTFOLIO_ANALYSIS",
    WALLET_ANALYSIS = "WALLET_ANALYSIS",
    MARKET_ANALYSIS = "MARKET_ANALYSIS",
    CREATE_STRATEGY = "CREATE_STRATEGY",
    LAST_10_TRADES = "LAST_10_TRADES",
    RUG_CHECK = "RUG_CHECK",
}
export const useChatStore = create<Store>()((set) => ({
    id: null,
    setId: (id: string) => set({ id }),
    messages: [],
    addMessage: (message: Message) => {
        set((state) => ({
            messages: [...state.messages, message]
        }))
    }
}));    