"use client";
import React from 'react'
import { Menu } from "lucide-react";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { routeList } from './header';

export const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
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
              <Logo />
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
          </div>
          <div className="mt-6 flex flex-col items-start justify-start gap-4">
            <Button asChild variant={"secondary"} className="w-full">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild className="w-full">
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
