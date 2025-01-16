"use client";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Send } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { promptformSchema, PromptformValues } from "./schema";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useSendMessage } from "@/hooks/use-chat";
import { useChatStore } from "@/stores/use-chat";
import logger from "@/lib/logger";
import { Input } from "@/components/ui/input";
import { useIsFetching } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "next/navigation";

export function PromptForm() {
  // const chatId = useChatStore((state) => state.id);
  const { id: chatId } = useParams()
  const setBotReplyId = useChatStore((state) => state.setBotReplyId);
  const form = useForm<PromptformValues>({
    resolver: zodResolver(promptformSchema),
  });

  //   const addMessage = useAddMessageInConversationMutation();
  //   const createConversation = useCreateConversationMutation();
  //   const uploadDocument = useUploadDocumentMutation();
  const { mutateAsync: sendMessage, isPending } = useSendMessage();

  const onSubmit = async () => {
    try {
      if (!chatId) {
        alert("Chat not found");
        return;
      }
      const message = await sendMessage({
        chatId: chatId?.toString(),
        content: form.getValues("message") || "",
      });
      setBotReplyId(message.botReplyId);
      logger.success("message sent", message);
      form.reset({ message: "" });
    } catch (error) {
      console.log(error);
    }
  };


  const isChatLoading = useIsFetching({ queryKey: ['messages', { chatId }] });


  if (isChatLoading) return (
    <Skeleton className="w-full h-20" />
  )

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="relative flex w-full gap-4 overflow-hidden border-t border-none bg-background sm:rounded-md">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Message Mamora..."
                      className="w-full resize-none border-none bg-transparent focus-within:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 sm:text-sm"
                      autoFocus
                      // onKeyDown={(e) => {
                      //   if (e.key === "Enter") {
                      //     e.preventDefault()
                      //     form.trigger()
                      //   };
                      // }}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="submit"
                  size="icon"
                  className="!aspect-square"
                  disabled={isPending}
                >
                  <Send size={15} />
                  <span className="sr-only">Send message</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Send message</TooltipContent>
            </Tooltip>
          </div>
        </form>
      </Form>
    </>
  );
}
