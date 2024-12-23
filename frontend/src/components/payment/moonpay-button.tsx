import { Button } from "@/components/ui/button";
import { useMoonPay } from "@/hooks/use-moonpay";
import { Banknote } from "lucide-react";

export function MoonPayButton() {
  const { openBuyWidget } = useMoonPay();

  return (
    <Button
      onClick={() => openBuyWidget()}
      variant="outline"
      className="flex items-center gap-2"
    >
      <Banknote className="h-4 w-4" />
      Buy/Sell SOL
    </Button>
  );
}
