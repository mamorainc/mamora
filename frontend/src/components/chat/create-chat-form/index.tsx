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
  Send,
} from "lucide-react";
import { MessageFormData, messageSchema } from "./schema";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  useCreateChat,
  useGetMessagesByChatId,
  useSendMessage,
} from "@/hooks/use-chat";
import { useChatStore } from "@/stores/use-chat";
import { useRouter } from "next/navigation";

export function CreateChatForm() {
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
  const { data: messages, isLoading: isLoadingMessages } =
    useGetMessagesByChatId();
  const { mutateAsync: createChat, isPending: isCreateChatPending } =
    useCreateChat();
  const { mutateAsync: sendMessage, isPending: isSendMessagePending } =
    useSendMessage();

  const handleSubmit = async (data: MessageFormData) => {
    try {
      const chat = await createChat();
      setId(chat.chatId);
      const message = await sendMessage({
        chatId: chat.chatId,
        content: data.message,
      });
      setBotReplyId(message.botReplyId);
      setLatestBotNotRepliedMessage(message.messageId);
      form.reset();
      router.push(`/chat/${chat.chatId}`);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const quickActions = [
    {
      icon: <Banknote size={15} className="ml-1" color="blue" />,
      label: "Portfolio Updates",
    },
    {
      icon: <Landmark size={15} className="ml-1" color="brown" />,
      label: "Market Updates",
    },
    {
      icon: <Brain size={15} className="ml-1" color="pink" />,
      label: "Create Strategy",
    },
    {
      icon: <ChartCandlestick size={15} className="ml-1" color="green" />,
      label: "Last 10 Trades",
    },
  ];

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center gap-8 px-4">
      <h2 className="text-2xl font-bold lg:text-3xl">What can I help with?</h2>

      {isLoadingMessages && <p>Loading messages...</p>}
      {messages?.map((message, index) => {
        return (
          <div key={index} className="border-4 p-2 text-sm">
            {JSON.stringify(message)}
          </div>
        );
      })}

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
                          <Send className="size-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Send Message</p>
                      </TooltipContent>
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
              form.setValue("message", action.label, { shouldValidate: true })
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
