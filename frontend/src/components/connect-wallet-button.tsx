import { walletMultiButtonCustomStyles } from "@/utils";
import dynamic from "next/dynamic";
import { ButtonProps } from "./ui/button";

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

export const ConnectWalletButton: React.FC<ButtonProps> = (props) => {
  return <WalletMultiButton style={walletMultiButtonCustomStyles} {...props} />;
};
