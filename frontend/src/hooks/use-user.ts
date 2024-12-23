import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  id: string;
  username: string;
  email: string;
  public_key: string;
  private_key: string;
};

type UserStore = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const useUser = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: "user-storage",
    },
  ),
);
