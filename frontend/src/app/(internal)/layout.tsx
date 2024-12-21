"use client";
import Cookies from "js-cookie";
import { cn } from "@/lib/utils";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layouts/internal/app-sidebar";
import { ReactNode, Suspense } from "react";
import { Header } from "@/components/layouts/internal/header";
import { ThemeToggle } from "@/components/theme-toggle";
import { Main } from "@/components/layouts/internal";
import { Search } from "@/components/search";
import { ProfileDropdown } from "@/components/profile-dropdown";

export default function InternalLayout({ children }: { children: ReactNode }) {
  const defaultOpen = Cookies.get("sidebar:state") !== "false";
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <SidebarProvider defaultOpen={defaultOpen}>
          <AppSidebar />
          <div
            id="content"
            className={cn(
              "ml-auto w-full max-w-full",
              "peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon))]",
              "peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]",
              "transition-[width] duration-200 ease-linear",
              "flex h-svh flex-col",
            )}
          >
            <Header sticky>
              <Search />
              <div className="ml-auto flex items-center space-x-4">
                <ThemeToggle className="hidden md:flex" />
                <ProfileDropdown />
              </div>
            </Header>
            <Main fixed>{children}</Main>
          </div>
        </SidebarProvider>
      </Suspense>
    </>
  );
}
