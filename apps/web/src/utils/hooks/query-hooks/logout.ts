import { useGet } from "@src/utils/axios/axios-get";

export const useLogoutQuery = () =>
  useGet({
    queryKey: ["logout"],
    url: "/auth/logout",
    options: {
      enabled: false,
    },
  });
