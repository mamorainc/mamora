
type Wallet = {
  tokens: Token[];
  nfts: NFT[];
  nativeBalance: NativeBalance;
  usdPrice: number;
}

export type WalletData = {
  status: number;
  message: string;
  data: Wallet;
};

export type Token = {
  associatedTokenAddress: string;
  mint: string;
  amountRaw: string;
  amount: string;
  decimals: number;
  name: string;
  symbol: string;
};

export type NFT = {
  associatedTokenAddress: string;
  mint: string;
  amountRaw: string;
  amount: string;
  decimals: number;
  name: string;
  symbol: string;
};

export type NativeBalance = {
  lamports: string;
  solana: string;
};
