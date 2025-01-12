import { Toaster } from "@/components/ui/toaster";
import "@/globals.css";
import { ThemeProvider } from "@/providers/theme";
import type { Metadata } from "next";
import { TanstackReactQueryProvider } from "@/providers/tanstack-react-query";
import { AuthWrapper } from "@/components/auth-wrapper";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthSessionProvider } from "@/providers/session";
import { Session } from "next-auth";

export const metadata: Metadata = {
  title: "Mamora",
  description: "A chat bot to automate you Solana work flows",
};

export default function RootLayout({
  children,
  session
}: Readonly<{
  children: React.ReactNode;
  session: Session | null
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >

          <AuthSessionProvider session={session}>
            <TanstackReactQueryProvider>
              <AuthWrapper>
                <TooltipProvider>{children}</TooltipProvider>
                <Toaster />
              </AuthWrapper>
            </TanstackReactQueryProvider>
          </AuthSessionProvider>

        </ThemeProvider>
      </body>
    </html>
  );
}
