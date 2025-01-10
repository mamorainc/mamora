'use client';
import { HTMLAttributes } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { IconBrandGoogle } from '@tabler/icons-react';
import { signIn } from 'next-auth/react';

type SignUpFormProps = HTMLAttributes<HTMLDivElement>;

export function SignUpForm({ className, ...props }: SignUpFormProps) {
  // const router = useRouter();
  // const { mutate: register, isPending } = useRegister({
  //   onSuccess() {
  //     form.reset();
  //     router.replace(`/dashboard`);
  //   },
  // });
  // const { toast } = useToast();
  // const form = useForm<SignUpFormData>({
  //   resolver: zodResolver(signUpformSchema),
  //   defaultValues: {
  //     email: '',
  //     password: '',
  //     confirmPassword: '',
  //   },
  // });

  // function onSubmit(data: SignUpFormData) {
  //   register({
  //     username: data.username,
  //     email: data.email,
  //     password: data.password,
  //   });
  //   toast({
  //     title: 'Sign Up Completed!',
  //   });
  // }

  return (
    <div className={cn('flex flex-col', className)} {...props}>
      {/* <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="xyz" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="mt-2" disabled={isPending}>
              {isPending ? 'Creating...' : 'Create Account'}
            </Button>
          </div>
        </form>
      </Form> */}
      <Button
        onClick={() => signIn('google')}
        className="flex items-center justify-center gap-2"
      >
        <IconBrandGoogle />
        <span> Sign In with Google</span>
      </Button>
    </div>
  );
}
