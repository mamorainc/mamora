"use client";
import { walletMultiButtonCustomStyles } from "@/utils";
import dynamic from "next/dynamic";
import { ButtonProps } from "./ui/button";
// import { useWallet } from "@solana/wallet-adapter-react";
// import { useRouter } from "next/navigation";
// import { useCallback, useEffect } from "react";

const WalletMultiButton = dynamic(
  () =>
    import("@solana/wallet-adapter-react-ui").then(
      (mod) => mod.WalletMultiButton,
    ),
  {
    ssr: false,
    loading() {
      return (
        <div className="inline-flex h-10 w-28 animate-pulse items-center justify-center rounded-md bg-primary/60" />
      );
    },
  },
);

export const WalletButton: React.FC<ButtonProps> = (props) => {
  // const { connected } = useWallet();
  // const router = useRouter();

  // const handleWalletStateChange = useCallback(() => {
  //   const timeoutId = setTimeout(() => {
  //     try {
  //       if (connected) {
  //         router.push("/dashboard");
  //       } else {
  //         router.push("/");
  //       }
  //     } catch (error) {
  //       console.error("Navigation failed:", error);
  //     }
  //   }, 100);

  //   return () => clearTimeout(timeoutId);
  // }, [connected, router]);

  // useEffect(() => {
  //   handleWalletStateChange();
  // }, [handleWalletStateChange]);

  return <WalletMultiButton style={walletMultiButtonCustomStyles} {...props} />;
};
