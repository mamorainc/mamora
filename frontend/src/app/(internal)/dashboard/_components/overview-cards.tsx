import { DollarSign, Coins, Layers } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WalletData } from '@/types/wallet';

interface OverviewCardsProps {
  walletData: WalletData;
}

export function OverviewCards({ walletData }: OverviewCardsProps) {
  const { tokens, nfts, nativeBalance, usdPrice } = walletData.data;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">SOL Balance</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{nativeBalance.solana} SOL</div>
          <p className="text-xs text-muted-foreground">
            ≈ ${Number(usdPrice).toFixed(2)}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tokens</CardTitle>
          <Coins className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{tokens.length}</div>
          <p className="text-xs text-muted-foreground">Total Tokens</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">NFTs</CardTitle>
          <Layers className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{nfts.length}</div>
          <p className="text-xs text-muted-foreground">Total NFTs</p>
        </CardContent>
      </Card>
    </div>
  );
}
