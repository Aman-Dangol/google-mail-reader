import { useGet } from "@src/utils/axios/axios-get";

export function useAuth({ code }: { code: string | null }) {
  return useGet<{ message: string }>({
    queryKey: ["auth-key", code],
    url: "/auth/login",
    params: { code },
    options: {
      enabled: !!code,
    },
  });
}
