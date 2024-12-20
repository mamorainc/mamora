import React from "react";
import { cn } from "@/lib/utils";

interface MainProps extends React.HTMLAttributes<React.ElementRef<"main">> {
  fixed?: boolean;
}

export const Main = React.forwardRef<React.ElementRef<"main">, MainProps>(
  ({ fixed, ...props }, ref) => {
    return (
      <main
        ref={ref}
        className={cn(
          "bg mt-2 flex flex-col h-full overflow-y-auto",
          fixed && "flex flex-grow flex-col overflow-hidden",
        )}
        {...props}
      />
    );
  },
);
Main.displayName = "Main";
