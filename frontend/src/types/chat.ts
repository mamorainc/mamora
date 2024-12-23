export interface CreateChatResponse {
  chatId: string
}

export interface SendMessageDto {
  chatId: string
  content: string
}

export interface SendMessageResponse {
  messageId: string
  botReplyId: string
}


export type UserMessage = {
  content: string
};

export type BotReply = {
  id: string;
  content: string;
  status: "FAILED" | "SUCCESS" | "PENDING";
  message_id: string;
  created_at: string;
  updated_at: string;
};

export type Message = {
  id: string;
  content: string;
  chat_id: string;
  created_at: string;
  updated_at: string;
  bot_reply: BotReply;
};

export enum MessageType {
  SWAP = "SWAP",
  PORTFOLIO_ANALYSIS = "PORTFOLIO_ANALYSIS",
  WALLET_ANALYSIS = "WALLET_ANALYSIS",
  MARKET_ANALYSIS = "MARKET_ANALYSIS",
  CREATE_STRATEGY = "CREATE_STRATEGY",
  LAST_10_TRADES = "LAST_10_TRADES",
  RUG_CHECK = "RUG_CHECK",
}
