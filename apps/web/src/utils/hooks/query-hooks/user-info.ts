import type { GoogleUser } from "@repo/shared-types/utils/user-info";
import { useGet } from "@src/utils/axios/axios-get";

export const useGetUserInfo = () => {
  return useGet<GoogleUser>({
    queryKey: ["userinfo"],
    url: "users/getUserInfo",
  });
};
