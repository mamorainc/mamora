import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { WalletData } from "@/types/wallet";
import { PriceCard } from "./price-card";
import { TokensList } from "./tokens-list";
import { StatsCard } from "./stats-card";
import { NFTsList } from "./nfts-list";

interface WalletDashboardProps {
  data: WalletData | undefined;
  isLoading: boolean;
  isError: boolean;
}

export function WalletDashboard({
  data,
  isLoading,
  isError,
}: WalletDashboardProps) {
  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Failed to load wallet data. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  if (!data) {
    return (
      <Alert>
        <AlertDescription>No wallet data available.</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <PriceCard price={data.usdPrice} />
        <StatsCard title="Total NFTs" value={data.data.nfts.length} />
        <StatsCard title="Total Tokens" value={data.data.tokens.length} />
      </div>

      <Tabs defaultValue="tokens">
        <TabsList>
          <TabsTrigger value="tokens">Tokens</TabsTrigger>
          <TabsTrigger value="nfts">NFTs</TabsTrigger>
        </TabsList>
        <TabsContent value="tokens">
          <TokensList tokens={data.tokens} />
        </TabsContent>
        <TabsContent value="nfts">
          <NFTsList nfts={data.nfts} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
