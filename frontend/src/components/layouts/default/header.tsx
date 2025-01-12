import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Logo } from "@/components/logo";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { auth } from "@/lib/auth";
import { HamburgerMenu } from "./hamburger-menu";

interface RouteProps {
  href: string;
  label: string;
}

export const routeList: RouteProps[] = [
  {
    href: "/#features",
    label: "Features",
  },
  {
    href: "/#team",
    label: "Team",
  },
  {
    href: "https://github.com/mamorainc/mamora",
    label: "Github",
  },
];



export const Navbar = async () => {
  const session = await auth()

  return (
    <header className="sticky top-5 z-40 mx-auto flex w-[90%] items-center justify-between rounded-2xl border border-secondary bg-card bg-opacity-15 p-4 shadow-inner md:w-[70%] lg:w-[75%] lg:max-w-screen-xl">
      <Logo />

      <div className="flex items-center lg:hidden">
        <HamburgerMenu />
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
        {false ? (
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-24 rounded-md" />
            <Skeleton className="h-10 w-24 rounded-md" />
          </div>
        ) : session?.user?.id ? (
          <Button asChild>
            <Link href="/dashboard">Open Dashboard</Link>
          </Button>
        ) : (
          <>
            <Button asChild variant="secondary">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </>
        )}
      </div>
    </header>
  );
};
