"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AreaChart, ResponsiveContainer } from "recharts";
import {
  IconWallet,
  IconCoin,
  IconChartPie,
  IconCurrencySolana,
} from "@tabler/icons-react";
import { useGetWalletData } from "@/hooks/use-wallet";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const data = [{ date: "Jan 1", balance: 5200 }];

function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="space-y-2">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-8 w-3/4" />
            </CardHeader>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-1/4" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function DashboardPage() {
  const { data: walletData, isLoading, isError, error } = useGetWalletData();

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error Loading Wallet Data</AlertTitle>
        <AlertDescription>
          {error instanceof Error
            ? error.message
            : "Failed to load wallet data"}
        </AlertDescription>
      </Alert>
    );
  }

  if (!walletData) {
    return (
      <Alert>
        <AlertTitle>No Wallet Data</AlertTitle>
        <AlertDescription>
          Please connect your wallet to view your assets.
        </AlertDescription>
      </Alert>
    );
  }

  const { tokens, nfts, nativeBalance, usdPrice } = walletData.data;
  const solanaValue = parseFloat(nativeBalance.solana) * usdPrice;

  const stats = [
    {
      title: "SOL Balance",
      value: `${parseFloat(nativeBalance.solana).toFixed(4)} SOL`,
      change: `$${solanaValue.toFixed(2)}`,
      icon: <IconWallet className="h-4 w-4" />,
      isPositive: true,
    },
    {
      title: "SOL Price",
      value: `$${usdPrice.toFixed(2)}`,
      change: "Current Price",
      icon: <IconCurrencySolana className="h-4 w-4" />,
      isPositive: true,
    },
    {
      title: "Total Tokens",
      value: tokens.length.toString(),
      change: `${tokens.length} tokens found`,
      icon: <IconCoin className="h-4 w-4" />,
      isPositive: true,
    },
    {
      title: "Total NFTs",
      value: nfts.length.toString(),
      change: `${nfts.length} NFTs found`,
      icon: <IconChartPie className="h-4 w-4" />,
      isPositive: true,
    },
  ];

  return (
    <div className="flex-1 space-y-4 overflow-y-auto p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
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
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tokens">Tokens</TabsTrigger>
          <TabsTrigger value="nfts">NFTs</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-full md:col-span-1 lg:col-span-4">
              <CardHeader>
                <div className="flex flex-col space-y-2">
                  <CardTitle className="text-base font-medium">
                    Total Balance
                  </CardTitle>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-bold">
                      {parseFloat(nativeBalance.solana).toFixed(4)} SOL
                    </span>
                    <span className="text-sm text-muted-foreground">
                      ${solanaValue.toFixed(2)}
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
                      {/* ... (rest of the chart configuration remains the same) */}
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-full md:col-span-1 lg:col-span-3">
              <CardHeader>
                <CardTitle>Token Holdings</CardTitle>
                <CardDescription>Your current token balances</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {tokens.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      No tokens found
                    </p>
                  ) : (
                    tokens.slice(0, 5).map((token) => (
                      <div key={token.mint} className="flex items-center">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback>{token.symbol[0]}</AvatarFallback>
                        </Avatar>
                        <div className="ml-4 space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {token.name || token.symbol}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {parseFloat(token.amount).toFixed(4)} {token.symbol}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
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
                {tokens.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No tokens found
                  </p>
                ) : (
                  tokens.map((token) => (
                    <div key={token.mint} className="flex items-center">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback>{token.symbol[0]}</AvatarFallback>
                      </Avatar>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {token.name || token.symbol}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {parseFloat(token.amount).toFixed(4)} {token.symbol}
                        </p>
                      </div>
                      <div className="ml-auto">
                        <p className="text-sm text-muted-foreground">
                          {token.mint.slice(0, 4)}...{token.mint.slice(-4)}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="nfts">
          <Card>
            <CardHeader>
              <CardTitle>NFT Collection</CardTitle>
              <CardDescription>Your NFT holdings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {nfts.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No NFTs found</p>
                ) : (
                  nfts.map((nft) => (
                    <div key={nft.mint} className="flex items-center">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback>{nft.symbol[0]}</AvatarFallback>
                      </Avatar>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {nft.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {nft.symbol}
                        </p>
                      </div>
                      <div className="ml-auto">
                        <p className="text-sm text-muted-foreground">
                          {nft.mint.slice(0, 4)}...{nft.mint.slice(-4)}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
