"use client";

import React from "react";
import { cn } from "@/lib/utils";
// import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

interface HeaderProps extends React.HTMLAttributes<React.ElementRef<"header">> {
  sticky?: boolean;
}

export const Header = React.forwardRef<React.ElementRef<"header">, HeaderProps>(
  ({ className, sticky, children, ...props }, ref) => {
    const [offset, setOffset] = React.useState(0);

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
          "flex h-16 items-center gap-3 bg-red-300 p-4 sm:gap-4",
          sticky && "sticky top-0 z-20",
          offset > 10 && sticky ? "shadow" : "shadow-none",
          className,
        )}
        {...props}
      >
        <SidebarTrigger
          variant="outline"
          className="scale-125 sm:scale-100"
        />
        <Separator orientation="vertical" className="h-6 hidden md:block" /> 
        {children}
      </header>
    );
  },
);
Header.displayName = "Header";
