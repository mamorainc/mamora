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
const features = [
  {
    title: "AI Chat Assistant",
    description:
      "Get instant answers about blockchain, DeFi, and market trends with our advanced AI.",
    icon: <IconRobot />,
  },
  {
    title: "Cross-Chain Support",
    description:
      "Seamlessly interact with multiple EVM chains including Ethereum, BSC, and Polygon.",
    icon: <IconLink />,
  },
  {
    title: "Smart Token Swaps",
    description:
      "Execute trades with AI-powered price optimization across multiple DEXes.",
    icon: <IconArrowsShuffle />,
  },
  {
    title: "Portfolio Tracking",
    description:
      "Track and analyze your crypto holdings with real-time performance metrics.",
    icon: <IconChartPie />,
  },
  {
    title: "Market Intelligence",
    description:
      "Access real-time market data, trends, and AI-generated insights.",
    icon: <IconChartLine />,
  },
  {
    title: "Smart Wallet",
    description:
      "Manage assets securely with AI-powered suggestions and risk analysis.",
    icon: <IconWallet />,
  },
  {
    title: "Transaction History",
    description:
      "View and analyze your complete transaction history across all chains.",
    icon: <IconHistory />,
  },
  {
    title: "24/7 AI Support",
    description: "Get instant help with our AI assistant that never sleeps.",
    icon: <IconMessageChatbot />,
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
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "group/feature relative flex flex-col py-10 dark:border-neutral-800 lg:border-r",
        (index === 0 || index === 4) && "dark:border-neutral-800 lg:border-l",
        index < 4 && "dark:border-neutral-800 lg:border-b",
      )}
    >
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
