
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Token } from '@/types/wallet';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TokenListProps {
  tokens: Token[];
}

export function TokenList({ tokens }: TokenListProps) {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Tokens</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            {tokens.length === 0 ? (
              <p className="text-sm text-muted-foreground">No tokens found</p>
            ) : (
              tokens.map((token) => (
                <div
                  key={token.mint}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div>
                    <p className="font-medium">{token.name}</p>
                    <p className="text-sm text-muted-foreground">{token.symbol}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{token.amount}</p>
                    <p className="text-sm text-muted-foreground">
                      {token.associatedTokenAddress.slice(0, 6)}...
                      {token.associatedTokenAddress.slice(-4)}
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
