"use client";

import * as React from "react";
import {
  ChatItemContainer,
  ChatItemSenderAvatar,
  ChatItemBody,
  ChatItemContent,
} from "./item";
import { AnimatePresence } from "framer-motion";

const chatData = [
  {
    align: "right",
    content: "Can you show me my current portfolio value and performance?",
  },
  {
    align: "left",
    content:
      "Your portfolio value is $45,231.89, up 2.5% in the last 24 hours. Your biggest holding is ETH at $25,000, followed by USDC at $15,000. Would you like to see a detailed breakdown or performance analytics?",
  },
  {
    align: "right",
    content: "I want to swap 0.5 ETH to USDC. What's the best rate available?",
  },
  {
    align: "left",
    content:
      "I've analyzed rates across major DEXs. Current best rate: 1 ETH = 1,856 USDC on Uniswap V3. For 0.5 ETH, you'll receive approximately 928 USDC (after 0.3% fee). Would you like me to prepare this swap for you?",
  },
  {
    align: "right",
    content: "What's happening with my DeFi positions across chains?",
  },
  {
    align: "left",
    content:
      "You have active positions in: \n1. Ethereum: Lending 2 ETH on Aave at 3.8% APY\n2. Polygon: Providing liquidity for MATIC/USDC pair, earning 12% APR\n3. BSC: Staking BNB earning 4.2% APY\nTotal DeFi earnings this month: $234.56",
  },
  {
    align: "right",
    content: "Give me a quick market update for ETH",
  },
  {
    align: "left",
    content:
      "ETH is currently trading at $1,856, up 2.1% in 24h. Trading volume: $12.5B. Key metrics:\n- Support level: $1,820\n- Resistance: $1,900\n- Market sentiment: Bullish\n- Gas fees: 25 gwei (low)\nShall I set up price alerts for you?",
  },
];

export default function AdvancedChatList() {
  return (
    <AnimatePresence initial={false} mode="popLayout">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-20 p-4 md:p-0">
        {chatData.map((chat, index) => (
          <ChatItemContainer
            key={index}
            align={chat.align === "left" ? "left" : "right"}
          >
            <ChatItemBody className={"max-w-[80%] gap-2"}>
              {chat.align === "left" && (
                <ChatItemSenderAvatar icon="assistant" className="" />
              )}
              <ChatItemContent
                className={
                  chat.align === "left" ? "border-none bg-transparent py-0" : ""
                }
              >
                {chat.content}
              </ChatItemContent>
            </ChatItemBody>
          </ChatItemContainer>
        ))}
      </div>
    </AnimatePresence>
  );
}
