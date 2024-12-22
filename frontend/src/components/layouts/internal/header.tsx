"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { useChatStore } from "@/stores/use-chat";
import { Button } from "@/components/ui/button";

interface HeaderProps extends React.HTMLAttributes<React.ElementRef<"header">> {
  sticky?: boolean;
}

export const Header = React.forwardRef<React.ElementRef<"header">, HeaderProps>(
  ({ className, sticky, children, ...props }, ref) => {
    const [offset, setOffset] = React.useState<number>(0);
    const chatStore = useChatStore();

    React.useEffect(() => {
      const onScroll = () => {
        setOffset(
          document.body.scrollTop || document.documentElement.scrollTop,
        );
      };

      document.addEventListener("scroll", onScroll, { passive: true });

      return () => document.removeEventListener("scroll", onScroll);
    }, []);

    return (
      <header
        ref={ref}
        className={cn(
          "flex h-16 items-center gap-3 p-4 sm:gap-4",
          sticky && "sticky top-0 z-20",
          offset > 10 && sticky ? "shadow" : "shadow-none",
          className,
        )}
        {...props}
      >
        <SidebarTrigger variant="outline" className="scale-125 sm:scale-100" />
        <Separator orientation="vertical" className="hidden h-6 md:block" />
        <Button
          onClick={() => {
            console.log(chatStore);
          }}
        >
          {" "}
          L{" "}
        </Button>
        {children}
      </header>
    );
  },
);
Header.displayName = "Header";
