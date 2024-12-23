import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PriceCardProps {
  price: number;
}

export function PriceCard({ price }: PriceCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Solana Price</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">${price.toFixed(2)}</p>
      </CardContent>
    </Card>
  );
}
