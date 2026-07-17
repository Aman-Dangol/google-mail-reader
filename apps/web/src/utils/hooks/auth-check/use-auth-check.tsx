import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useCookies } from "react-cookie";
import { useAuth } from "@src/utils/hooks/query-hooks/auth";

//only use at one place
export function useAuthCheck() {
  const [params] = useSearchParams();
  const code = params.get("code");
  const [cookie] = useCookies(["refresh_token"]);
  const navigate = useNavigate();

  const { isLoading, isError } = useAuth({ code });

  // Handle code-based auth
  useEffect(() => {
    if (code && !isLoading && !isError) {
      navigate("/", { replace: true });
    }
  }, [code, isLoading, isError, navigate]);

  // Handle unauthenticated users
  useEffect(() => {
    if (!code && !isLoading && !cookie.refresh_token) {
      navigate("/login", { replace: true });
    }
  }, [code, cookie.refresh_token, isLoading, navigate]);

  return { isLoading, isError, isAuthenticated: !!cookie.refresh_token };
}
