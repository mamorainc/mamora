import "@/globals.css";
import { AppWalletProvider } from "@/providers/app-wallet";
import { ThemeProvider } from "@/providers/theme";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { TanstackReactQueryProvider } from "@/providers/tanstack-react-query";

export const metadata: Metadata = {
  title: "Mamora",
  description: "A chat bot to automate you Solana work flows",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
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
          <TanstackReactQueryProvider>
            <AppWalletProvider>{children}</AppWalletProvider>
          </TanstackReactQueryProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
