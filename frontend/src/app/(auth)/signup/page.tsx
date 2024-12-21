import Link from "next/link";
import { Logo } from "@/components/logo";
import { SignUpForm } from "@/components/forms/sign-up";

export default function SignUp() {
  return (
    <div className="container relative mx-auto grid h-svh flex-col items-center justify-center px-4 lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Logo />
        </div>

        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              The AI assistant simplified my crypto journey. Managing
              multi-chain assets and understanding DeFi is now effortless. My
              portfolio performance improved by 35% within weeks.
            </p>
            <footer className="text-sm">
              ~ Pranay Varma, Software Engineer
            </footer>
          </blockquote>
        </div>
      </div>

      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-left">
            <h1 className="text-2xl font-semibold tracking-tight">
              {" "}
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email and password to create an account. <br />
              Already have an account?{" "}
              <Link
                href="/login"
                className="underline underline-offset-4 hover:text-primary"
              >
                log In
              </Link>
            </p>
          </div>
          <SignUpForm />
          <p className="mt-4 px-8 text-center text-sm text-muted-foreground">
            By creating an account, you agree to our{" "}
            <a
              href="#"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
