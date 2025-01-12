"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
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
        className={cn(classes?.root)}
      >
        <Image
          src={`/assets/images/mamora-logo.png`}
          alt="Mamora Logo"
          width={350}
          height={350}
          className={cn("size-9 lg:hidden aspect-square", {
            "lg:block size-7": !isSidebarOpen,
          })}
        />
        <Image
          src={`/assets/images/mamora-full-logo.png`}
          alt="Mamora Full Logo"
          width={350}
          height={350}
          className={cn("hidden lg:block max-w-[6.5rem] aspect-auto", {
            "lg:hidden": !isSidebarOpen,
          })}
        />

      </Link>
    );
  },
);

Logo.displayName = "Logo";
