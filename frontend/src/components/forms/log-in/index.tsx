"use client";
import { HTMLAttributes } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { LogInFormSchema, logInformSchema } from "./schema";
import { useLogin } from "@/hooks/use-authentication";

type UserAuthFormProps = HTMLAttributes<HTMLDivElement>;

export function LoginForm({ className, ...props }: UserAuthFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const { mutate: login } = useLogin({
    onSuccess() {
      form.reset();
      router.replace(`/dashboard`);
    },
  });
  const form = useForm<LogInFormSchema>({
    resolver: zodResolver(logInformSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: LogInFormSchema) {
    login(data);
    toast({
      title: "Sign In Completed!",
    });
    // router.replace("/dashboard");
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <div className="flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                  </div>
                  <FormControl>
                    <PasswordInput placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="mt-2">Login</Button>

            {/* <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="outline" className="w-full" type="button">
                GitHub
              </Button>
              <Button variant="outline" className="w-full" type="button">
                Facebook
              </Button>
            </div> */}
          </div>
        </form>
      </Form>
    </div>
  );
}
