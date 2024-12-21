"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Banknote,
  Brain,
  ChartCandlestick,
  Landmark,
  Send,
} from "lucide-react";
import { MessageFormData, messageSchema } from "./schema";
import { useRouter } from "next/navigation";

export function CreateChatForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<MessageFormData>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      message: "",
    },
  });

  const handleSubmit = async (data: MessageFormData) => {
    try {
      const uuid =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
      setIsSubmitting(true);
      console.log(data);
      form.reset();
      router.push(`/chat/${uuid}`);
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsSubmitting(false);
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
                    <Button type="submit" size="icon" disabled={isSubmitting}>
                      <Send className="size-4" />
                    </Button>
                  </div>
                </div>
                <FormMessage />
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
          >
            {action.icon} {action.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
