import { Request, Response, Router } from 'express';
import prisma from '../db';
import processUserMessage from '../service/user_message.service';
const chatRouter = Router();

const getAllMessagesByChatId = async function (req: Request, res: Response) {
  try {
    const userId = req.userId;
    const chatId = req.params['chatId'];
    if (!userId) {
      // console.log('user not found');
      res.status(400).json({ error: 'user not found' });
      return;
    }
    if (!chatId) {
      // console.log('chat not given in param');
      res.status(400).json({ error: 'chat not found' });
      return;
    }
    const allMessages = await prisma.message.findMany({
      where: {
        chat_id: chatId,
        chat: {
          user_id: userId,
        },
      },
      include: {
        bot_reply: true,
      },
    });

    res.status(200).json(allMessages);
  } catch (e) {
    // console.log(e);
    res.status(500).json({ error: 'something went wrong' });
  }
};
const getAllChatsForUser = async function (req: Request, res: Response) {
  try {
    const userId = req.userId;
    if (!userId) {
      // console.log('user not found');
      res.status(400).json({ error: 'user not found' });
      return;
    }
    const allChats = await prisma.chat.findMany({
      where: {
        user_id: userId,
      },
      select: {
        id: true,
        title: true,
        created_at: true
      },
      orderBy: {
        created_at: 'desc',
      },
    });
    res.status(200).json(allChats);
  } catch (e) {
    // console.log(e);
    res.status(500).json({ error: 'something went wrong' });
  }
};
const createNewChat = async function (req: Request, res: Response) {
  try {
    const userId = req.userId as string | undefined;
    if (!userId) {
      res.status(401).json({ error: 'User ID header is missing' });
      return;
    }
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      res.status(400).json({ error: 'cannot find user' });
      return;
    }

    const newChatId = await prisma.chat.create({
      data: {
        title: 'New Title',
        user_id: user.id,
      },
    });

    res.status(201).json({ chatId: newChatId.id });
  } catch (e) {
    // console.log(e);
    res.status(500).json({ error: 'something went wrong' });
  }
};

const sendMessageInChat = async function (req: Request, res: Response) {
  try {
    const userId = req.userId as string | undefined;
    if (!userId) {
      res.status(401).json({ error: 'User ID header is missing' });
      return;
    }
    const { chatId, content } = req.body;
    if (!chatId || !content) {
      res.status(400).json({ error: 'chatId and content are required' });
      return;
    }
    const message = await prisma.message.create({
      data: {
        content,
        chat: { connect: { id: chatId } },
        bot_reply: {
          create: {
            status: 'PENDING',
            content: '',
          },
        },
      },
      include: { bot_reply: true },
    });
    const botReplyId = message.bot_reply?.id;
    if (!botReplyId) {
      res.status(500).json({ error: 'Failed to create bot reply' });
      return;
    }

    res.status(200).json({
      messageId: message.id,
      botReplyId,
    });

    processUserMessage(botReplyId, content, userId, chatId).catch((err) => {
      console.error('Error in background processBotReply:', err);
    });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Failed to send message' });
    return;
  }
};
const getBotReply = async function (req: Request, res: Response) {
  try {
    const { botReplyId } = req.params;
    if (!botReplyId) {
      res.status(400).json({ error: 'botReplyId is required' });
      return;
    }
    const botReply = await prisma.botReply.findUnique({
      where: { id: botReplyId },
    });

    if (!botReply) {
      res.status(404).json({ error: 'Bot reply not found' });
      return;
    }

    res.status(200).json(botReply);
  } catch (error) {
    console.error('Error fetching bot reply:', error);
    res.status(500).json({ error: 'Failed to fetch bot reply' });
  }
};

chatRouter.get('/:chatId', getAllMessagesByChatId);
chatRouter.get('/', getAllChatsForUser);
chatRouter.post('/', createNewChat);
chatRouter.post('/send-message', sendMessageInChat);
chatRouter.get('/bot-reply/:botReplyId', getBotReply);

export default chatRouter;
