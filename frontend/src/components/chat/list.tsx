"use client";
import React, { JSX, useEffect, useRef } from "react";
import {
  ChatItemContainer,
  ChatItemSenderAvatar,
  ChatItemBody,
  ChatItemContent,
} from "./item";
import { AnimatePresence } from "framer-motion";
import { useGetMessagesByChatId } from "@/hooks/use-chat";
import { useParams } from "next/navigation";
import { useChatStore } from "@/stores/use-chat";
import { useIsMutating, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import logger from "@/lib/logger";
import { CircleCheck } from "lucide-react";
import { Button } from "../ui/button";

enum ReplyStatus {
  PENDING = "PENDING",
  SENT = "SENT",
  RECEIVED = "RECEIVED",
  FAILED = "FAILED",
}
interface BotReply {
  id: string;
  content: string | null;
  created_at: Date;
  updated_at: Date;
  status: ReplyStatus;
  message_id: string;
}

export default function ChatList() {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const isMutating = useIsMutating({ mutationKey: ["sendMessage"] });
  const { data: messages, isLoading: isMessagesLoading } =
    useGetMessagesByChatId(id?.toString());
  const setChatId = useChatStore((state) => state.setId);
  const botReplyId = useChatStore((state) => state.botReplyId);
  const setBotReplyId = useChatStore((state) => state.setBotReplyId);

  const chatItemsContainerRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!isMessagesLoading) {
      scrollToBottom();
    }
  }, [messages, isMessagesLoading]);

  useEffect(() => {
    if (!id) return;
    setChatId(id?.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const { data, isLoading: isBotReplyLoading } = useQuery({
    queryKey: ["bot-reply", { botReplyId }],
    queryFn: async () => {
      const response = await api.get<BotReply>(
        `/api/v1/chat/bot-reply/${botReplyId}`,
      );
      logger.info("bot-reply data", response.data);
      return response.data;
    },
    refetchInterval: 1000,
    enabled: !!botReplyId,
  });

  useEffect(() => {
    const invalidateQuery = async () => {
      console.log(`first`);
      await queryClient.invalidateQueries({
        queryKey: ["messages", { chatId: id }],
      });
      console.log(`second`);
    };

    logger.info("data in useEffect", data);

    if (!isBotReplyLoading && data) {
      if (data?.status === "SENT") {
        invalidateQuery();
        setBotReplyId(null);
        logger.info("setting bot reply id to null, new data", data);
      }
    }
  }, [isBotReplyLoading, data]);

  const getData = (
    type:
      | "getUserBalance"
      | "getUserPublicKey"
      | "getBalanceByPublicKey"
      | "sendSol"
      | "swapToken"
      | "message",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any,
  ): { component?: JSX.Element; text?: string } => {
    switch (type) {
      case "getUserBalance":
        return {
          text:
            data?.actionResult?.data?.balance ||
            "ERROR IN GETTING USER BALANCE",
        };

      case "getBalanceByPublicKey":
        return {
          text:
            data?.actionResult?.data?.balance ||
            "ERROR IN GETTING USER BALANCE",
        };
      case "message":
        return {
          text: data?.data || "ERROR IN MESSAGE",
        };

      case "sendSol":
        return {
          component: (
            <div className="flex flex-col items-start justify-start gap-4">
              <ChatItemContent className="flex flex-row items-center justify-center gap-2">
                <CircleCheck className="size-5 text-primary" />{" "}
                <span>Transaction successful!</span>
              </ChatItemContent>
              <ChatItemContent className="flex flex-row items-center justify-center gap-2">
                Your user now has received {data?.amount || "ERROR"} SOL
              </ChatItemContent>
              <ChatItemContent className="border-none bg-transparent p-0">
                <Button
                  onClick={() =>
                    window.open(
                      `https://explorer.solana.com/tx/${data?.actionResult?.data?.txHash}?cluster=devnet`,
                    )
                  }
                >
                  {" "}
                  View Transaction{" "}
                </Button>
              </ChatItemContent>
            </div>
          ),
        };
      default:
        return {
          text: "ERROR IN GETTING DATA",
        };
    }
  };

  if (isMessagesLoading) {
    return (
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-20 p-4 md:p-0">
        Messages Loading...
      </div>
    );
  }
  return (
    <AnimatePresence initial={false} mode="popLayout">
      <div
        ref={chatItemsContainerRef}
        className="mx-auto flex w-full max-w-3xl flex-col gap-20 p-4 md:p-0"
      >
        {/* {latestBotNotRepliedMessage.content ? (
          <ChatItemContainer align={"right"}>
            <ChatItemBody className={"max-w-[80%] gap-2"}>
              <ChatItemContent>{latestBotNotRepliedMessage.content}</ChatItemContent>
            </ChatItemBody>
          </ChatItemContainer>
        ) : null} */}

        {messages?.map((message) => (
          <div key={message.id} className="flex w-full flex-col gap-10">
            {/* User   */}
            <ChatItemContainer align={"right"}>
              <ChatItemBody className={"max-w-[80%] gap-2"}>
                <ChatItemContent>{message.content}</ChatItemContent>
              </ChatItemBody>
            </ChatItemContainer>
            {/* Bot */}
            {data?.status != "PENDING" ? (
              <ChatItemContainer align={"left"}>
                <ChatItemBody className={"max-w-[80%] gap-2"}>
                  <ChatItemSenderAvatar icon="assistant" />
                  <ChatItemContent className="break-all border-none bg-transparent">
                    {
                      getData(
                        message.bot_reply.content.type,
                        message.bot_reply.content,
                      ).text
                    }
                    {
                      getData(
                        message.bot_reply.content.type,
                        message.bot_reply.content,
                      ).component
                    }
                  </ChatItemContent>
                </ChatItemBody>
              </ChatItemContainer>
            ) : null}
          </div>
        ))}

        {isMutating || isBotReplyLoading ? (
          <ChatItemContainer align={"left"}>
            <ChatItemBody className={"max-w-[80%] gap-2"}>
              <ChatItemSenderAvatar icon="assistant" />
              <ChatItemContent className="border-none bg-transparent">
                <div className="flex w-max items-center gap-2">
                  <div className="size-2 animate-bounce rounded-full bg-secondary-foreground/30"></div>
                  <div className="size-2 animate-bounce rounded-full bg-secondary-foreground/30 [animation-delay:-.3s]"></div>
                  <div className="size-2 animate-bounce rounded-full bg-secondary-foreground/30 [animation-delay:-.5s]"></div>
                </div>
              </ChatItemContent>
            </ChatItemBody>
          </ChatItemContainer>
        ) : null}
        <div ref={bottomRef} />
      </div>
    </AnimatePresence>
  );
}
