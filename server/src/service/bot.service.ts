import { HumanMessage } from '@langchain/core/messages';
import { MemorySaver } from '@langchain/langgraph';
import { createReactAgent } from '@langchain/langgraph/prebuilt';
import { ChatOpenAI } from '@langchain/openai';
import { SolanaAgentKit, createSolanaTools } from 'solana-agent-kit';
import prisma from '../db';
var mapOFAGENTS = new Map<string, any>();

async function processBotReply(
  botReplyId: string,
  userMessageContent: string,
  userId: string
) {
  try {
    let agent;
    const oldAgent = mapOFAGENTS.get(userId);
    if (!oldAgent) {
      console.log('oldagent not found starting new agent');
      agent = await initializeAgentForUser(userId);
      console.log('new agent started');
    } else {
      console.log('reusing old agent');
      agent = oldAgent;
    }
    if (!agent) {
      console.log('undefiend or null agent');
      return;
    }

    const config = { configurable: { thread_id: 'Solana Agent Kit!' } };
    const stream = await agent.stream(
      { messages: [new HumanMessage(userMessageContent)] },
      config
    );

    let accumulated = '';

    for await (const chunk of stream) {
      let textChunk = '';

      if ('agent' in chunk) {
        textChunk = chunk.agent.messages[0].content;
      } else if ('tools' in chunk) {
        textChunk = chunk.tools.messages[0].content;
      }

      accumulated += textChunk + '\n';

      await prisma.botReply.update({
        where: { id: botReplyId },
        data: {
          content: accumulated,
        },
      });
    }

    await prisma.botReply.update({
      where: { id: botReplyId },
      data: { status: 'SENT' },
    });
    console.log('Bot reply completed successfully');
  } catch (error) {
    console.error('Error streaming bot reply:', error);
    await prisma.botReply.update({
      where: { id: botReplyId },
      data: { status: 'FAILED' },
    });
  }
}

async function initializeAgentForUser(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user || !user.private_key) {
    throw new Error(
      `User or user's Solana private key not found (userId: ${userId})`
    );
  }

  const llm = new ChatOpenAI({
    modelName: process.env.MODEL_NAME,
    temperature: 0.7,
    openAIApiKey: process.env.AI_API_KEY,
  });

  const solanaKit = new SolanaAgentKit(
    user.private_key,
    process.env.RPC_URL,
    process.env.AI_API_KEY!
  );

  const tools = createSolanaTools(solanaKit);

  const memory = new MemorySaver();

  return createReactAgent({
    llm,
    tools,
    checkpointSaver: memory,
  });
}

export default processBotReply;
