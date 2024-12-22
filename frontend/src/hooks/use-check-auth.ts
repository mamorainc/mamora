import { api } from "@/lib/axios";
import logger from "@/lib/logger";
import { useAuth } from "@/stores/use-auth";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function useCheckAuth() {
  const router = useRouter();
  const pathname = usePathname();
  const { setAuth, setLoading, logout } = useAuth();

  useEffect(() => {
    const checkAuth = async () => {
      await sleep(1500);
      try {
        const response = await api.get("/api/v1/user/me");
        if (response.data?.data?.user) {
          setAuth(response.data.data.user);
          if (pathname === "/") {
            logger.info("Redirecting to dashboard");
            router.replace("/dashboard");
          }
        } else {
          logout();
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        logout();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [setAuth, setLoading, logout]);
}
