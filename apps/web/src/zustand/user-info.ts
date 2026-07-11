import { create } from "zustand";
import type { GoogleUser } from "@repo/shared-types/utils/user-info";

interface UserInfoStore {
  userInfo: GoogleUser | null;
  setUserInfo: (userInfo: GoogleUser) => void;
}

export const useUserInfoStore = create<UserInfoStore>((set) => ({
  userInfo: null,
  setUserInfo: (userInfo) => set({ userInfo }),
}));
