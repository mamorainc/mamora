"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/stores/use-auth";
import Image from "next/image";
import Link from "next/link";

const heroData = {
  badge: {
    status: "LAUNCH",
    message: "Beta version is live!",
  },
  heading: {
    prefix: "Experience the",
    highlight: "Future of Web3",
    suffix: "with AI",
  },
  description:
    "Your AI-powered companion for blockchain interactions, portfolio analysis, and market insights. Get smarter answers about your crypto assets across all chains.",
  buttons: {
    primary: {
      text: "Create Account",
      action: "/signup",
    },
    secondary: {
      text: "View All Features",
      action: "/#features",
    },
  },
  image: {
    src: "/assets/images/hero.png",
    alt: "Nebula AI Dashboard",
  },
  gradientColors: "from-[#6366f1] to-[#8b5cf6]",
};

export const Hero = () => {
  const isAuthenticated = useAuth((state) => state.isAuthenticated)
  return (
    <section className="container mx-auto w-full">
      <div className="mx-auto grid place-items-center gap-8 py-20 lg:max-w-screen-xl">
        <div className="space-y-8 text-center">
          <Badge variant="outline" className="py-2 text-sm">
            <span className="mr-2 text-primary">
              <Badge>{heroData.badge.status}</Badge>
            </span>
            <span>{heroData.badge.message}</span>
          </Badge>

          <div className="mx-auto max-w-screen-md text-center text-4xl font-bold md:text-6xl">
            <h1>
              {heroData.heading.prefix}
              <span
                className={`bg-gradient-to-r ${heroData.gradientColors} bg-clip-text px-2 text-transparent`}
              >
                {heroData.heading.highlight}
              </span>
              {heroData.heading.suffix}
            </h1>
          </div>

          <p className="mx-auto max-w-screen-sm text-xl text-muted-foreground">
            {heroData.description}
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild className="w-5/6 font-bold md:w-1/4">
              <Link href={isAuthenticated ? "/dashboard" : "/signup"}>
                {isAuthenticated ? "Open Dashboard" : heroData.buttons.primary.text}
              </Link>
            </Button>

            <Button
              asChild
              variant="secondary"
              className="w-5/6 font-bold md:w-1/4"
            >
              <Link href={heroData.buttons.secondary.action}>
                {heroData.buttons.secondary.text}
              </Link>
            </Button>
          </div>
        </div>

        <div className="group relative mt-14">
          <div className="absolute left-1/2 top-2 mx-auto h-24 w-[90%] -translate-x-1/2 transform rounded-full bg-primary/50 blur-3xl lg:-top-8 lg:h-80"></div>
          <Image
            width={1200}
            height={1200}
            className="rouded-lg relative mx-auto flex w-full items-center rounded-lg border border-t-2 border-secondary border-t-primary/30 leading-none md:w-[1200px]"
            src={heroData.image.src}
            alt={heroData.image.alt}
          />

          <div className="absolute bottom-0 left-0 h-20 w-full rounded-lg bg-gradient-to-b from-background/0 via-background/50 to-background md:h-28"></div>
        </div>
      </div>
    </section>
  );
};
