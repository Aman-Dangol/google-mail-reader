import { create } from "zustand";

type AuthStore = {
  token: string;
  setToken: (token: string) => void;
  deleteToken: () => void;
};

export const useAuth = create<AuthStore>((set) => ({
  token: "",

  setToken: (token) =>
    set(() => ({
      token,
    })),

  deleteToken: () =>
    set(() => ({
      token: "",
    })),
}));
