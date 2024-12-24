import { cn } from "@/lib/utils";
import {
  IconRobot,
  IconLink,
  IconArrowsShuffle,
  IconChartPie,
  IconChartLine,
  IconWallet,
  IconHistory,
  IconMessageChatbot,
} from "@tabler/icons-react";
import { Badge } from "../ui/badge";

const features = [
  {
    title: "AI Chat Assistant",
    description:
      "Get instant insights about Solana blockchain, DeFi protocols, and real-time market trends through our advanced AI.",
    icon: <IconRobot />,
    isComingSoon: false,
  },
  {
    title: "Cross-Chain Support",
    description:
      "Connect and interact seamlessly across multiple blockchain networks including Solana, Ethereum, and Polygon.",
    icon: <IconLink />,
    isComingSoon: true,
  },
  {
    title: "Token Swaps",
    description:
      "Exchange tokens effortlessly with optimal rates, such as SOL to USDC or any other supported pairs.",
    icon: <IconArrowsShuffle />,
    isComingSoon: true,
  },
  {
    title: "Solana Transfers",
    description:
      "Send SOL securely to any Solana wallet address with real-time transaction confirmation.",
    icon: <IconChartLine />,
    isComingSoon: false,
  },
  {
    title: "Portfolio Analytics",
    description:
      "Monitor and analyze your crypto portfolio with comprehensive real-time performance metrics.",
    icon: <IconChartPie />,
    isComingSoon: true,
  },
  {
    title: "Smart Wallet",
    description:
      "Secure asset management enhanced by AI-powered insights and proactive risk analysis.",
    icon: <IconWallet />,
    isComingSoon: true,
  },
  {
    title: "Transaction History",
    description:
      "Access and analyze your complete transaction history with detailed insights across networks.",
    icon: <IconHistory />,
    isComingSoon: true,
  },
  {
    title: "24/7 AI Support",
    description:
      "Access immediate assistance through our always-available AI support system.",
    icon: <IconMessageChatbot />,
    isComingSoon: true,
  },
];

export function Features() {
  return (
    <div
      id="features"
      className="container mx-auto grid grid-cols-1 py-10 md:grid-cols-2 lg:grid-cols-4"
    >
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
  isComingSoon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
  isComingSoon: boolean;
}) => {
  return (
    <div
      className={cn(
        "group/feature relative flex flex-col py-10 dark:border-neutral-800 lg:border-r",
        (index === 0 || index === 4) && "dark:border-neutral-800 lg:border-l",
        index < 4 && "dark:border-neutral-800 lg:border-b",
      )}
    >
      {isComingSoon && <Badge variant={"outline"} className="absolute top-4 right-4"> Coming Soon</Badge>}

      {index < 4 && (
        <div className="pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100 dark:from-neutral-800" />
      )}
      {index >= 4 && (
        <div className="pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100 dark:from-neutral-800" />
      )}
      <div className="relative z-10 mb-4 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="relative z-10 mb-2 px-10 text-lg font-bold">
        <div className="absolute inset-y-0 left-0 h-6 w-1 origin-center rounded-br-full rounded-tr-full bg-neutral-300 transition-all duration-200 group-hover/feature:h-8 group-hover/feature:bg-blue-500 dark:bg-neutral-700" />
        <span className="inline-block text-neutral-800 transition duration-200 group-hover/feature:translate-x-2 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="relative z-10 max-w-xs px-10 text-sm text-neutral-600 dark:text-neutral-300">
        {description}
      </p>
    </div>
  );
};
