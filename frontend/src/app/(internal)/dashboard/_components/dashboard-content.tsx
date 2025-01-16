"use client"
import { WalletData } from '@/types/wallet';
import { OverviewCards } from './overview-cards';
import { TokenList } from './token-list';
import { NFTList } from './nft-list';
import { DashboardHeader } from './dashboard-header';

interface DashboardContentProps {
  initialWalletData: WalletData
  userId: string
}

export function DashboardContent({ initialWalletData }: DashboardContentProps) {
  const walletData = initialWalletData
  // const { data: walletData } = useQuery({
  //   queryKey: ['walletData', userId],
  //   queryFn: () => getWalletData(userId),
  //   initialData: initialWalletData,
  //   enabled: !!userId,
  // })


  return (
    <div className="space-y-6 p-6 overflow-y-auto">
      <DashboardHeader
        title="Wallet Dashboard"
        subtitle="Manage your tokens and NFTs in one place"
      />

      <div className="space-y-6">
        <OverviewCards walletData={walletData} />

        <div className="grid gap-6 md:grid-cols-2">
          <TokenList tokens={walletData.data.tokens} />
          <NFTList nfts={walletData.data.nfts} />
        </div>
      </div>
    </div>
  );
}
