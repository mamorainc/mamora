'use client';
import { HTMLAttributes } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PasswordInput } from '@/components/ui/password-input';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { LogInFormSchema, logInformSchema } from './schema';
import { signIn } from 'next-auth/react';
import { IconBrandGoogle } from '@tabler/icons-react';

type UserAuthFormProps = HTMLAttributes<HTMLDivElement>;

export function LoginForm({ className, ...props }: UserAuthFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<LogInFormSchema>({
    resolver: zodResolver(logInformSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: LogInFormSchema) {
    const result = await signIn('credentials', {
      ...data,
      redirect: false,
    });
    if (result?.ok) {
      const callbackUrl = '/dashboard';
      router.push(callbackUrl);
    } else if (result?.error) {
      console.error(result.error);
      toast({ title: 'Invalid email or password' });
    } else {
      toast({ title: 'Something went wrong' });
    }
  }

  return (
    <div className={cn('grid gap-2', className)} {...props}>
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
            <Button className="mt-2" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Logging in..." : "Log in"}
            </Button>
          </div>
        </form>
      </Form>
      <Button variant={'secondary'} disabled={form.formState.isSubmitting} onClick={() => signIn('google')} className='flex items-center justify-center gap-2'>
        <IconBrandGoogle />
        <span> Sign In with Google</span>
      </Button>
    </div>
  );
}
