import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { NFT } from '@/types/wallet';
import { ScrollArea } from '@/components/ui/scroll-area';

interface NFTListProps {
  nfts: NFT[];
}

export function NFTList({ nfts }: NFTListProps) {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>NFTs</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            {nfts.length === 0 ? (
              <p className="text-sm text-muted-foreground">No NFTs found</p>
            ) : (
              nfts.map((nft) => (
                <div
                  key={nft.mint}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div>
                    <p className="font-medium">{nft.name}</p>
                    <p className="text-sm text-muted-foreground">{nft.symbol}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">
                      {nft.mint.slice(0, 6)}...{nft.mint.slice(-4)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
