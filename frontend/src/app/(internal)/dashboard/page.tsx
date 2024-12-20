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
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
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

const chartData = [
  { name: "Jan", value: 35000 },
  { name: "Feb", value: 38000 },
  { name: "Mar", value: 36000 },
  { name: "Apr", value: 42000 },
  { name: "May", value: 45231 },
];

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
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            {/* Portfolio Chart */}
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Portfolio Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Token List */}
            <Card className="col-span-3">
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

        <TabsContent value="transactions">
          <TransactionsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import {
  ConfirmedSignatureInfo,
  ParsedTransactionWithMeta,
} from "@solana/web3.js";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { IconAlertCircle, IconClock, IconSend } from "@tabler/icons-react";
import { RadioReceiver } from "lucide-react";

interface Transaction {
  signature: string;
  timestamp: number;
  type: string;
  status: string;
  amount?: number;
  token?: string;
}

export function TransactionsTab() {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!publicKey) return;

      setIsLoading(true);
      setError(null);

      try {
        const signatures = await connection.getSignaturesForAddress(
          publicKey,
          { limit: 10 },
          "confirmed",
        );

        const txDetails = await Promise.all(
          signatures.map(async (sig) => {
            const tx = await connection.getParsedTransaction(sig.signature);
            return processTxData(sig, tx);
          }),
        );

        setTransactions(
          txDetails.filter((tx): tx is Transaction => tx !== null),
        );
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch transactions",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [connection, publicKey]);

  const processTxData = (
    sigInfo: ConfirmedSignatureInfo,
    tx: ParsedTransactionWithMeta | null,
  ): Transaction | null => {
    if (!tx) return null;

    return {
      signature: sigInfo.signature,
      timestamp: sigInfo.blockTime ? sigInfo.blockTime * 1000 : Date.now(),
      type: determineTxType(tx),
      status: tx.meta?.err ? "Failed" : "Success",
      amount: extractAmount(tx),
      token: "SOL", // Add token detection logic if needed
    };
  };

  const determineTxType = (_tx: ParsedTransactionWithMeta): string => {
    // Add your transaction type detection logic here
    return "Transfer";
  };

  const extractAmount = (tx: ParsedTransactionWithMeta): number | undefined => {
    // Add your amount extraction logic here
    return 0;
  };

  if (!publicKey) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>
            Connect your wallet to view transactions
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Alert>
            <IconAlertCircle className="h-4 w-4" />
            <AlertTitle>No Wallet Connected</AlertTitle>
            <AlertDescription>
              Please connect your wallet to view your transaction history.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Loading your recent activity...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>
            There was an error loading your transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <IconAlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  if (transactions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>No transactions found</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <IconClock className="h-4 w-4" />
            <AlertTitle>No Transactions</AlertTitle>
            <AlertDescription>
              You haven&apos;t made any transactions yet with this wallet.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>Your recent blockchain activity</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {transactions.map((tx) => (
            <div key={tx.signature} className="flex items-center space-x-4">
              <div
                className={`rounded-full p-2 ${
                  tx.status === "Success" ? "bg-green-100" : "bg-red-100"
                }`}
              >
                {tx.type === "Send" ? (
                  <IconSend className="h-6 w-6" />
                ) : (
                  <RadioReceiver className="h-6 w-6" />
                )}
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">{tx.type}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(tx.timestamp).toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">
                  {tx.amount} {tx.token}
                </p>
                <p
                  className={`text-xs ${
                    tx.status === "Success" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {tx.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
