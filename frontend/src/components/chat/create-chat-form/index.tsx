"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  Banknote,
  Brain,
  ChartCandlestick,
  Landmark,
  Loader2,
  Send,
} from "lucide-react";
import { MessageFormData, messageSchema } from "./schema";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCreateChat, useSendMessage } from "@/hooks/use-chat";
import { useChatStore } from "@/stores/use-chat";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { getSession } from "next-auth/react";

export function CreateChatForm() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const setId = useChatStore((state) => state.setId);
  const setBotReplyId = useChatStore((state) => state.setBotReplyId);
  const setLatestBotNotRepliedMessage = useChatStore(
    (state) => state.setLatestBotNotRepliedMessage,
  );
  const form = useForm<MessageFormData>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      message: "",
    },
  });
  const { mutateAsync: createChat, isPending: isCreateChatPending } =
    useCreateChat();
  const { mutateAsync: sendMessage, isPending: isSendMessagePending } =
    useSendMessage();

  const handleSubmit = async (data: MessageFormData) => {
    try {
      const session = await getSession();
      const userId = session?.user?.id;
      if (!userId) {
        alert("Please login to create a chat");
        return;
      }
      const chat = await createChat({ userId });
      setId(chat.chatId);
      const message = await sendMessage({
        chatId: chat.chatId,
        content: data.message,
      });
      setBotReplyId(message.botReplyId);
      setLatestBotNotRepliedMessage(message.messageId);
      await queryClient.invalidateQueries({
        queryKey: ["chats"],
      });
      form.reset();
      router.push(`/chat/${chat.chatId}`);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const quickActions = [
    {
      icon: <Banknote size={15} className="ml-1" color="blue" />,
      label: "Balance",
      value: "What is my balance?",
    },
    {
      icon: <Landmark size={15} className="ml-1" color="brown" />,
      label: "Market Updates",
      value: "What are the latest market updates?",
    },
    {
      icon: <Brain size={15} className="ml-1" color="pink" />,
      label: "Create Strategy",
      value: "How can I create a strategy to get 10% ROI?",
    },
    {
      icon: <ChartCandlestick size={15} className="ml-1" color="green" />,
      label: "Last 10 Trades",
      value: "What are the latest trades?",
    },
  ] as const;

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center gap-8 px-4">
      <h2 className="mx-auto text-2xl font-semibold lg:text-3xl">
        {" "}
        What can I help with?
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-full space-y-4"
        >
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <div className="relative">
                  <FormControl>
                    <Textarea
                      placeholder="Type your message here..."
                      className="w-full resize-none py-4 pr-20"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <div className="absolute bottom-4 right-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          type="submit"
                          size="icon"
                          disabled={isCreateChatPending || isSendMessagePending}
                        >
                          {isCreateChatPending || isSendMessagePending ? (
                            <Loader2 className="size-4 animate-spin" />
                          ) : (
                            <Send className="size-4" />
                          )}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Send Message</TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </FormItem>
            )}
          />
        </form>
      </Form>

      <div className="flex w-full flex-wrap items-center justify-center gap-4">
        {quickActions.map((action, index) => (
          <Button
            key={index}
            variant="outline"
            onClick={() =>
              form.setValue("message", action.value, { shouldValidate: true })
            }
            disabled={isCreateChatPending || isSendMessagePending}
          >
            {action.icon} {action.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
