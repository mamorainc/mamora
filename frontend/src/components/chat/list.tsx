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
import { CircleCheck, MoveRight } from "lucide-react";
import { Button } from "../ui/button";
import { useAuth } from "@/stores/use-auth";
import { shortenWalletAddress } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

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
  const {
    data: messages,
    isLoading: isMessagesLoading,
    isRefetching: isMessagesRefetching,
    isFetching: isMessagesFetching,
    error: messagesError,
    isError: isMessagesError,
  } = useGetMessagesByChatId(id?.toString());
  const setChatId = useChatStore((state) => state.setId);
  const botReplyId = useChatStore((state) => state.botReplyId);
  const setBotReplyId = useChatStore((state) => state.setBotReplyId);
  const user = useAuth((state) => state.user);

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
      await queryClient.invalidateQueries({
        queryKey: ["messages", { chatId: id }],
      });
      setBotReplyId(null);
    };

    logger.info("data in useEffect", data);

    if (!isBotReplyLoading && data) {
      if (data?.status === "SENT") {
        invalidateQuery();
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
            data?.actionResult?.data?.balance ??
            "ERROR IN GETTING USER BALANCE",
        };

      case "getBalanceByPublicKey":
        return {
          text:
            data?.actionResult?.data?.balance ??
            "ERROR IN GETTING USER BALANCE",
        };
      case "message":
        return {
          text: data?.data ?? "ERROR IN MESSAGE",
        };
      case "swapToken":
        return {
          component: (
            <div className="flex flex-col items-start justify-start gap-4">
              {data?.actionResult?.error ? (
                data?.actionResult?.error
              ) : (
                <div className="flex flex-col items-start justify-start gap-4">
                  <ChatItemContent className="flex flex-row items-center justify-center gap-2">
                    <CircleCheck className="size-5 text-primary" />{" "}
                    <span>Swap successful!</span>
                  </ChatItemContent>

                  <ChatItemContent className="flex flex-col items-start justify-start gap-4 pt-4">
                    <div className="flex items-center justify-center gap-2">
                      <div className="size-6 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                      <p className="text-xs text-muted-foreground">
                        {" "}
                        {shortenWalletAddress(
                          data?.fromToken?.addr || "ERROR",
                        )}{" "}
                      </p>
                      <MoveRight size={20} className="text-muted-foreground" />
                      <div className="size-6 rounded-full bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-100 via-teal-300 to-green-200"></div>
                      <p className="text-xs text-muted-foreground">
                        {" "}
                        {shortenWalletAddress(
                          data?.fromToken?.addr || "ERROR",
                        )}{" "}
                      </p>
                    </div>
                    <Button
                      onClick={() =>
                        window.open(
                          `https://explorer.solana.com/tx/${data?.actionResult?.data?.txHash}`,
                        )
                      }
                      className="w-full"
                      variant={"link"}
                    >
                      {" "}
                      View Transaction{" "}
                    </Button>
                  </ChatItemContent>
                </div>
              )}
            </div>
          ),
        };

      case "sendSol":
        return {
          component: (
            <div className="flex flex-col items-start justify-start gap-4">
              <ChatItemContent className="flex flex-row items-center justify-center gap-2">
                <CircleCheck className="size-5 text-primary" />{" "}
                <span>Transaction successful!</span>
              </ChatItemContent>

              <ChatItemContent className="flex flex-col items-start justify-start gap-4 pt-4">
                <div className="flex items-center justify-center gap-2">
                  <div className="size-6 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                  <p className="text-xs text-muted-foreground">
                    {" "}
                    {shortenWalletAddress(user?.public_key || "ERROR")}{" "}
                  </p>
                  <MoveRight size={20} className="text-muted-foreground" />
                  <div className="size-6 rounded-full bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-100 via-teal-300 to-green-200"></div>
                  <p className="text-xs text-muted-foreground">
                    {" "}
                    {shortenWalletAddress(data?.toPublicKey || "ERROR")}{" "}
                  </p>
                </div>
                <Button
                  onClick={() =>
                    window.open(
                      `https://explorer.solana.com/tx/${data?.actionResult?.data?.txHash}?cluster=devnet`,
                    )
                  }
                  className="w-full"
                  variant={"link"}
                >
                  {" "}
                  View Transaction{" "}
                </Button>
              </ChatItemContent>

              <ChatItemContent className="flex flex-row items-center justify-center gap-2">
                Your user now has received {data?.amount || "ERROR"} SOL
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
        {Array.from({ length: 10 }).map((_, i) => {
          return i % 2 === 0 ? (
            <ChatItemContainer key={i} align={"right"}>
              <ChatItemBody
                className={"w-full gap-2 bg-transparent lg:max-w-[40%]"}
              >
                <ChatItemContent className="flex w-full flex-row items-center justify-center gap-2 border-none bg-transparent p-0">
                  <Skeleton className="h-10 w-full rounded-md" />
                </ChatItemContent>
              </ChatItemBody>
            </ChatItemContainer>
          ) : (
            <ChatItemContainer key={i} align={"left"}>
              <ChatItemBody
                className={"w-full gap-2 bg-transparent lg:max-w-[40%]"}
              >
                <ChatItemContent className="flex w-full flex-row items-center justify-center gap-2 border-none bg-transparent p-0">
                  <Skeleton className="!aspect-square !size-10 rounded-full" />
                  <Skeleton className="h-10 w-full rounded-md" />
                </ChatItemContent>
              </ChatItemBody>
            </ChatItemContainer>
          );
        })}
      </div>
    );
  }

  if (isMessagesError) {
    return (
      <p className="my-4 text-sm font-medium text-destructive">
        {messagesError?.message || "ERROR IN GETTING MESSAGES"}
      </p>
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
          </div>
        ))}

        {isBotReplyLoading ||
        isMutating ||
        isMessagesRefetching ||
        isMessagesFetching ? (
          <>
            <ChatItemContainer align={"right"}>
              <ChatItemBody className={"max-w-[80%] gap-2"}>
                <ChatItemContent className="border-none bg-transparent">
                  <div className="flex w-max items-center gap-2">
                    <div className="size-2 animate-bounce rounded-full bg-secondary-foreground/30"></div>
                    <div className="size-2 animate-bounce rounded-full bg-secondary-foreground/30 [animation-delay:-.3s]"></div>
                    <div className="size-2 animate-bounce rounded-full bg-secondary-foreground/30 [animation-delay:-.5s]"></div>
                  </div>
                </ChatItemContent>
                <ChatItemSenderAvatar icon="user" />
              </ChatItemBody>
            </ChatItemContainer>
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
          </>
        ) : null}
        <div ref={bottomRef} />
      </div>
    </AnimatePresence>
  );
}
