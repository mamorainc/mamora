"use client";
import { cn } from "@/lib/utils";
import { Box } from "lucide-react";
import Link from "next/link";
import { memo } from "react";

type Props = {
  classes?: {
    root?: string;
    logo?: string;
    logoIcon?: string;
  };
  href?: string;
  isSidebarOpen?: boolean;
};

export const Logo = memo(
  ({ classes, href = "/", isSidebarOpen = true }: Props) => {
    return (
      <Link
        href={href}
        className={cn("flex items-center text-lg font-bold", classes?.root)}
      >
        <div
          className={cn(
            "mr-2 flex !aspect-square !size-9 items-center justify-center rounded-lg border border-secondary bg-gradient-to-tr from-primary via-primary/70 to-primary text-white",
            classes?.logo,
          )}
        >
          <Box className={cn("size-7", classes?.logoIcon)} />
        </div>
        {isSidebarOpen ? "Mamora" : null}
      </Link>
    );
  },
);

Logo.displayName = "Logo";
