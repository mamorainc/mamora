import { api } from "@/lib/axios";
import { useAuth } from "@/stores/use-auth";
import { WalletData } from "@/types/wallet";
import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react";

export const useGetWalletData = () => {
  // const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const { status } = useSession();
  const userWallet = useAuth((state) => state.user?.public_key);

  return useQuery({
    queryKey: ["wallet"],
    queryFn: async () => {
      const response =  await api.get<WalletData>(`/api/v1/user/wallet?wallet=${userWallet}&chain=mainnet`)
      return response.data
    },
    enabled: status === "authenticated" && !!userWallet,
  });
};
