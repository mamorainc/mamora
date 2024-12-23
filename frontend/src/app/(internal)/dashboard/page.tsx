"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { IconWallet, IconCoin, IconChartPie } from "@tabler/icons-react";

const portfolioData = {
  totalBalance: "45,231.89",
  walletAddress: "0x1234...5678",
  changePercentage: 2.5,
  isPositive: true,
  tokens: [
    {
      name: "Ethereum",
      symbol: "ETH",
      balance: "12.5",
      value: "25,000",
      change: 3.2,
    },
    {
      name: "USD Coin",
      symbol: "USDC",
      balance: "15000",
      value: "15,000",
      change: 0,
    },
    {
      name: "Chainlink",
      symbol: "LINK",
      balance: "500",
      value: "5,231.89",
      change: -1.2,
    },
  ],
};

const stats = [
  {
    title: "Total Value",
    value: "$45,231.89",
    change: "+2.5%",
    icon: <IconWallet className="h-4 w-4" />,
    isPositive: true,
  },
  {
    title: "24h Change",
    value: "$1,231.89",
    change: "+2.5%",
    icon: <IconChartPie className="h-4 w-4" />,
    isPositive: true,
  },
  {
    title: "Total Tokens",
    value: "3",
    change: "0",
    icon: <IconCoin className="h-4 w-4" />,
    isPositive: true,
  },
];

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 overflow-y-auto p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span
                  className={
                    stat.isPositive ? "text-green-500" : "text-red-500"
                  }
                >
                  {stat.change}
                </span>{" "}
                from last 24h
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tokens">Tokens</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
            <WalletBalanceChart />

            {/* Token List */}
            <Card className="col-span-full md:col-span-1 lg:col-span-3">
              <CardHeader>
                <CardTitle>Token Holdings</CardTitle>
                <CardDescription>Your current token balances</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {portfolioData.tokens.map((token) => (
                    <div key={token.symbol} className="flex items-center">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback>{token.symbol[0]}</AvatarFallback>
                      </Avatar>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {token.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {token.balance} {token.symbol}
                        </p>
                      </div>
                      <div className="ml-auto text-right">
                        <p className="text-sm font-medium leading-none">
                          ${token.value}
                        </p>
                        <p
                          className={`text-sm ${token.change >= 0 ? "text-green-500" : "text-red-500"}`}
                        >
                          {token.change >= 0 ? "+" : ""}
                          {token.change}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tokens">
          <Card>
            <CardHeader>
              <CardTitle>All Tokens</CardTitle>
              <CardDescription>
                A detailed list of all your token holdings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {portfolioData.tokens.map((token) => (
                  <div key={token.symbol} className="flex items-center">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback>{token.symbol[0]}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {token.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {token.balance} {token.symbol}
                      </p>
                    </div>
                    <div className="ml-auto text-right">
                      <p className="text-sm font-medium leading-none">
                        ${token.value}
                      </p>
                      <p
                        className={`text-sm ${token.change >= 0 ? "text-green-500" : "text-red-500"}`}
                      >
                        {token.change >= 0 ? "+" : ""}
                        {token.change}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

import { AreaChart, Area } from "recharts";

const data = [
  { date: "Jan 1", balance: 5200 },
  { date: "Jan 8", balance: 4800 },
  { date: "Jan 15", balance: 6100 },
  { date: "Jan 22", balance: 5900 },
  { date: "Jan 29", balance: 7200 },
  { date: "Feb 5", balance: 6800 },
  { date: "Feb 12", balance: 8400 },
  { date: "Feb 19", balance: 8900 },
  { date: "Feb 26", balance: 8100 },
  { date: "Mar 5", balance: 9600 },
  { date: "Mar 12", balance: 9200 },
  { date: "Mar 19", balance: 10400 },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-2 shadow-lg">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-sm text-primary">
          ${payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

export function WalletBalanceChart() {
  const currentBalance = data[data.length - 1].balance;
  const previousBalance = data[data.length - 2].balance;
  const percentageChange = (
    ((currentBalance - previousBalance) / previousBalance) *
    100
  ).toFixed(2);
  const isPositive = currentBalance >= previousBalance;

  return (
    <Card className="col-span-full md:col-span-1 lg:col-span-4">
      <CardHeader>
        <div className="flex flex-col space-y-2">
          <CardTitle className="text-base font-medium">Total Balance</CardTitle>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold">
              ${currentBalance.toLocaleString()}
            </span>
            <span
              className={`text-sm ${isPositive ? "text-green-500" : "text-red-500"}`}
            >
              {isPositive ? "+" : ""}
              {percentageChange}%
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="gradientFill" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor="rgb(59, 130, 246)"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="100%"
                    stopColor="rgb(59, 130, 246)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#6B7280" }}
                dy={10}
              />
              <YAxis
                hide={true}
                domain={["dataMin - 1000", "dataMax + 1000"]}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{
                  stroke: "#6B7280",
                  strokeWidth: 1,
                  strokeDasharray: "5 5",
                }}
              />
              <Area
                type="monotone"
                dataKey="balance"
                stroke="#3B82F6"
                strokeWidth={2}
                fill="url(#gradientFill)"
                animationDuration={2000}
                dot={false}
                activeDot={{
                  r: 6,
                  fill: "#3B82F6",
                  stroke: "#fff",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
