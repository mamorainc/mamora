"use client";
import { ChevronsDown, Menu } from "lucide-react";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
// import { ThemeToggle } from "@/components/theme-toggle";
import { Logo } from "@/components/logo";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  {
    href: "/#features",
    label: "Features",
  },
  {
    href: "/#team",
    label: "Team",
  },
  {
    href: "/#contact",
    label: "Contact",
  },
  {
    href: "/#faq",
    label: "FAQs",
  },
];
// const features: FeatureProps[] = [
//   {
//     title: "AI Chat Assistant",
//     description:
//       "Get instant answers about blockchain, your portfolio, and market trends",
//   },
//   {
//     title: "Cross-Chain Support",
//     description: "Seamlessly interact with multiple EVM-compatible blockchains",
//   },
//   {
//     title: "Smart Swaps",
//     description: "Execute token swaps with AI-powered price optimization",
//   },
//   {
//     title: "Portfolio Analysis",
//     description: "Track and analyze your crypto holdings across all chains",
//   },
//   {
//     title: "Market Intelligence",
//     description: "Real-time market data and trend analysis at your fingertips",
//   },
//   {
//     title: "Smart Wallet",
//     description:
//       "Manage all your crypto assets with AI-powered insights and security",
//   },
// ];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <header className="sticky top-5 z-40 mx-auto flex w-[90%] items-center justify-between rounded-2xl border border-secondary bg-card bg-opacity-15 p-2 shadow-inner md:w-[70%] lg:w-[75%] lg:max-w-screen-xl">
      <Logo />

      {/* <!-- Mobile --> */}
      <div className="flex items-center lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Menu
              onClick={() => setIsOpen(!isOpen)}
              className="cursor-pointer lg:hidden"
            />
          </SheetTrigger>

          <SheetContent
            side="left"
            className="flex flex-col justify-between rounded-br-2xl rounded-tr-2xl border-secondary bg-card"
          >
            <div>
              <SheetHeader className="mb-4 ml-4">
                <SheetTitle className="flex items-center">
                  <Link href="/" className="flex items-center">
                    <ChevronsDown className="mr-2 h-9 w-9 rounded-lg border border-secondary bg-gradient-to-tr from-primary via-primary/70 to-primary text-white" />
                    Shadcn
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-2">
                {routeList.map(({ href, label }) => (
                  <Button
                    key={href}
                    onClick={() => setIsOpen(false)}
                    asChild
                    variant="ghost"
                    className="justify-start text-base"
                  >
                    <Link href={href}>{label}</Link>
                  </Button>
                ))}

                <Button size="sm" className="mt-4">
                  Connect Wallet
                </Button>
              </div>
            </div>

            <SheetFooter className="flex-col items-start justify-start sm:flex-col">
              <Separator className="mb-2" />

              {/* <ThemeToggle /> */}
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      {/* <!-- Desktop --> */}
      <NavigationMenu className="mx-auto hidden lg:block">
        <NavigationMenuList>
          <NavigationMenuItem>
            {routeList.map(({ href, label }) => (
              <NavigationMenuLink key={href} asChild>
                <Link href={href} className="px-2 text-base">
                  {label}
                </Link>
              </NavigationMenuLink>
            ))}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="hidden items-center gap-4 lg:flex">
        {/* <ThemeToggle /> */}

        <Button size="sm">Connect Wallet</Button>
      </div>
    </header>
  );
};
