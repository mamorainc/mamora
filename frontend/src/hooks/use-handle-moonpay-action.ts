import { useEffect } from "react";
import { useMoonPay } from "./use-moonpay";

export function useHandleMoonPayAction(message: any) {
  const { openBuyWidget } = useMoonPay();

  useEffect(() => {
    try {
      if (typeof message === "string") {
        const parsedMessage = JSON.parse(message);
        if (parsedMessage?.action === "OPEN_MOONPAY") {
          openBuyWidget(parsedMessage.amount);
        }
      }
    } catch {
      // Not a JSON message or doesn't have OPEN_MOONPAY action
      return;
    }
  }, [message, openBuyWidget]);
}
