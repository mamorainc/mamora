import { WalletData } from '@/types/wallet';
import { OverviewCards } from './overview-cards';
import { TokenList } from './token-list';
import { NFTList } from './nft-list';
import { DashboardHeader } from './dashboard-header';

interface DashboardContentProps {
  walletData: WalletData;
}

export function DashboardContent({ walletData }: DashboardContentProps) {
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
