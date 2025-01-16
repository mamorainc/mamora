import { ChatService } from '@/services/chat';
import { formatDateTime } from '@/utils/date';
import { auth } from '@/lib/auth';
import { FormattedChat } from '@/types/chat';

interface ChatDataProviderProps {
  children: (chats: FormattedChat[]) => React.ReactNode;
}

export async function ChatDataProvider({ children }: ChatDataProviderProps) {
  const session = await auth();
  const userId = session?.user?.id;
  const chatService = new ChatService(userId);

  try {
    const chats = await chatService.getChats();
    const formattedChats = chats.map(chat => ({
      ...chat,
      created_at: formatDateTime(chat.created_at)
    }));
    
    return children(formattedChats);
  } catch (error) {
    console.error('Error fetching chats:', error);
    return children([]);
  }
}
