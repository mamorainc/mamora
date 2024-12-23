"use client";
import Textarea from "react-textarea-autosize";
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
import { useQueryClient } from "@tanstack/react-query";

export function PromptForm() {
  const queryClient = useQueryClient();
  const chatId = useChatStore((state) => state.id);
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
      console.log("Message is ",message)
      // TAKE OUT BOT ID FROM THE RESPONSE
      // START A FOR LOOP WITH 3 SECOND DELAY
      // FETCH THE ENDPOINT FOR BOT REPLY STATUS
      // ADD CONDITION IF BOT REPLY STATUS IS SENT THEN STOP THE LOOP AND BREAKT OUT
      // DO IT FOR 3 TIMES FOR TOTOLA OF 9 SECONDS
      // IF STILL AT THE END OF 9 SECONDS BOT STATUS IS NOT SENT THEN SHOW ERROR
      
      await queryClient.invalidateQueries({
        queryKey: ["messages", { chatId: chatId?.toString() }],
      });
      form.reset({ message: "" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="relative flex max-h-[50vh] w-full grow flex-col overflow-hidden border-t bg-background pl-2 pr-10 sm:rounded-md sm:border sm:pl-4 sm:pr-14">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      tabIndex={0}
                      placeholder="Message Mamora..."
                      className="min-h-[60px w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
                      autoFocus
                      spellCheck={false}
                      autoComplete="off"
                      autoCorrect="off"
                      rows={1}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="absolute right-2 top-[13px] sm:right-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button type="submit" size="icon" disabled={isPending}>
                    <Send size={15} />
                    <span className="sr-only">Send message</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Send message</TooltipContent>
              </Tooltip>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
}
