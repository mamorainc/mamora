import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const shortenWalletAddress = (walletAddress: string, startLength = 5, endLength = 5): string => {
  if (!walletAddress) return '';
  if (walletAddress.length <= startLength + endLength) return walletAddress;
  const start = walletAddress.slice(0, startLength);
  const end = walletAddress.slice(-endLength);
  return `${start}....${end}`;
}

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
