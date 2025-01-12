import { api } from "@/lib/axios";
import { useAuth } from "@/stores/use-auth";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export function useCheckAuth() {
  const { setAuth } = useAuth();
  const { status } = useSession()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (status !== 'authenticated') return null;
        const response = await api.get("/api/v1/user/me");
        console.log(response)
        if (response.data?.data?.user) {
          setAuth(response.data.data.user);
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) { }
    };

    checkAuth();
  }, [status]);
}
