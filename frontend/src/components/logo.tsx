import { cn } from "@/lib/utils";
import { Box } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useSidebar } from "./ui/sidebar";

type Props = {
  classes?: {
    root?: string;
    logo?: string;
    logoIcon?: string;
  };
  href?: string;
};

export const Logo = ({ classes, href = "/" }: Props) => {
  const { open } = useSidebar();
  return (
    <Link
      href={href}
      className={cn("flex items-center text-lg font-bold", classes?.root)}
    >
      <div
        className={cn(
          "mr-2 flex !size-9 !aspect-square items-center justify-center rounded-lg border border-secondary bg-gradient-to-tr from-primary via-primary/70 to-primary text-white",
          classes?.logo,
        )}
      >
        <Box className={cn("size-7", classes?.logoIcon)} />
      </div>
      {open ? "Mamora" : null}
    </Link>
  );
};
