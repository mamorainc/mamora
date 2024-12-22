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
