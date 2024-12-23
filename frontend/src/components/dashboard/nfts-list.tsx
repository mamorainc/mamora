"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NFT } from "@/types/wallet";

interface NFTsListProps {
  nfts: NFT[];
}

export function NFTsList({ nfts }: NFTsListProps) {
  if (nfts.length === 0) {
    return <div className="py-8 text-center">No NFTs found</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {nfts.map((nft, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{nft.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mt-2 text-sm text-gray-500">{nft.amount}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
