"use client";

import * as React from "react";
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
import { useIsMutating } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

export default function ChatList() {
  const { id } = useParams();
  const isMutating = useIsMutating({ mutationKey: ["sendMessage"] });
  const { data: messages, isLoading: isLoadingMessages } =
    useGetMessagesByChatId(id?.toString());

  const setChatId = useChatStore((state) => state.setId);

  React.useEffect(() => {
    if (!id) return;
    setChatId(id?.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (isLoadingMessages) {
    return (
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-20 p-4 md:p-0"></div>
    );
  }
  return (
    <AnimatePresence initial={false} mode="popLayout">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-20 p-4 md:p-0">
        {/* {latestBotNotRepliedMessage.content ? (
          <ChatItemContainer align={"right"}>
            <ChatItemBody className={"max-w-[80%] gap-2"}>
              <ChatItemContent>{latestBotNotRepliedMessage.content}</ChatItemContent>
            </ChatItemBody>
          </ChatItemContainer>
        ) : null} */}

        {messages?.map((message) => (
          <div key={message.id} className="flex flex-col gap-2">
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
                <ChatItemContent className="border-none bg-transparent">
                  {message.bot_reply.content || "EMPTY RESPONSE"}
                </ChatItemContent>
              </ChatItemBody>
            </ChatItemContainer>
          </div>
        ))}

        {isMutating ? (
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
      </div>
    </AnimatePresence>
  );
}
