import axios from 'axios';
import { Router } from 'express';
import prisma from '../db';
const chatRouter = Router();

chatRouter.post('/send-message', async function (req, res) {
  const { chatId, content } = req.body;

  if (!chatId || !content) {
    res.status(400).json({ error: 'chatId and content are required' });
    return;
  }

  try {
    const message = await prisma.message.create({
      data: {
        content,
        chat: { connect: { id: chatId } },
        bot_reply: {
          create: {
            status: 'PENDING',
          },
        },
      },
      include: { bot_reply: true },
    });
    const botReplyId = message.bot_reply?.id;

    res.status(200).json({
      messageId: message.id,
      botReplyId,
    });

    processBotReply(botReplyId as string, content);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

async function processBotReply(botReplyId: string, userMessageContent: string) {
  try {
    const apiKey = process.env.AI_API_KEY;
    const aiEndpoint = process.env.AI_ENDPOINT;
    const modelName = process.env.MODEL_NAME;

    if (!apiKey) {
      throw new Error('API_KEY is not set');
    }
    if (!aiEndpoint) {
      throw new Error('AI_ENDPOINT is not set');
    }
    if (!modelName) {
      throw new Error('MODEL_NAME is not set');
    }

    const response = await axios.post(
      aiEndpoint,
      {
        model: modelName,
        messages: [{ role: 'user', content: userMessageContent }],
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );
    const botReplyContent = response.data.choices?.[0]?.message?.content || '';
    await prisma.botReply.update({
      where: { id: botReplyId },
      data: {
        content: botReplyContent,
        status: 'SENT',
      },
    });

    console.log('Bot reply updated successfully:', botReplyContent);
  } catch (error) {
    console.error('Error processing bot reply:', error);
    await prisma.botReply.update({
      where: { id: botReplyId },
      data: {
        status: 'FAILED',
      },
    });
  }
}

chatRouter.get('/bot-reply/:botReplyId', async function (req, res) {
  const { botReplyId } = req.params;

  if (!botReplyId) {
    res.status(400).json({ error: 'botReplyId is required' });
    return;
  }

  try {
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
});

export default chatRouter;
