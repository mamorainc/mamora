"use client";
import Textarea from "react-textarea-autosize";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Send } from "lucide-react";
// import {
//   useAddMessageInConversationMutation,
//   useCreateConversationMutation,
//   useUploadDocumentMutation,
// } from "@/services/chat/mutations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { promptformSchema, PromptformValues } from "./schema";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

export function PromptForm() {
  const { toast } = useToast();
  //   const params = useParams<{ id: string }>();
  //   const router = useRouter();
  const form = useForm<PromptformValues>({
    resolver: zodResolver(promptformSchema),
  });
  //   const addMessage = useAddMessageInConversationMutation();
  //   const createConversation = useCreateConversationMutation();
  //   const uploadDocument = useUploadDocumentMutation();

  const onSubmit = async (data: PromptformValues) => {
    alert(JSON.stringify(data, null, 2));
    toast({
      title: "Mamora",
    });
    form.reset({ message: "" });
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="relative flex max-h-[50vh] border-t w-full grow flex-col overflow-hidden bg-background pl-2 pr-10 sm:rounded-md sm:border sm:pl-4 sm:pr-14"> 
            {/* <Tooltip> 
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  type="button"
                  className="absolute left-0 top-[14px] size-8 rounded-full bg-background p-0 sm:left-4"
                  onClick={() => uploadFileRef.current?.click()}
                  //   disabled={
                  //     addMessage.isPending ||
                  //     createConversation.isPending ||
                  //     uploadDocument.isPending
                  //   }
                >
                  <Plus />
                  <span className="sr-only">Upload files</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Upload files</TooltipContent>
            </Tooltip> */}

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
                  <Button type="submit" size="icon">
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
