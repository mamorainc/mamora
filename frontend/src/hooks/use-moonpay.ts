import { useCallback, useEffect, useState } from "react";
import { loadMoonPay } from "@moonpay/moonpay-js";
import { useUser } from "./use-user";

export function useMoonPay() {
  const { user } = useUser();
  const [moonPaySdk, setMoonPaySdk] = useState<any>(null);

  useEffect(() => {
    const initMoonPay = async () => {
      const moonPay = await loadMoonPay();
      setMoonPaySdk(moonPay);
    };
    initMoonPay();
  }, []);

  const openBuyWidget = useCallback(
    async (amount?: string) => {
      if (!user?.public_key || !moonPaySdk) {
        console.error("No wallet address found or MoonPay not initialized");
        return;
      }

      // Generate unsigned URL
      const widget = moonPaySdk({
        flow: "buy",
        environment: process.env.NEXT_PUBLIC_MOONPAY_ENV || "production",
        variant: "overlay",
        useWarnBeforeRefresh: false,
        baseUrl: process.env.NEXT_PUBLIC_MOONPAY_WIDGET_URL!,
        params: {
          apiKey: process.env.NEXT_PUBLIC_MOONPAY_API_KEY!,
          defaultCurrencyCode: "sol",
          walletAddress: user.public_key,
          colorCode: "#000000",
          baseCurrencyAmount: amount,
        },
        handlers: {
          async onTransactionCompleted(props: any) {
            console.log("Transaction completed:", props);
          },
        },
      });

      // Get URL for signing
      const urlForSignature = widget.generateUrlForSigning();

      // Send to backend for signing
      const response = await fetch("/api/v1/payment/sign-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ urlForSignature }),
      });

      const { signature } = await response.json();

      // Update widget with signature and show
      widget.updateSignature(signature);
      widget.show();
    },
    [moonPaySdk, user?.public_key],
  );

  return { openBuyWidget };
}
