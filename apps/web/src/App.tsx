import { Sidebar } from "@src/components/sidebar";
import { Outlet } from "react-router";
import { Navbar } from "@src/components/Nav-bar";
import { useAuthCheck } from "@src/utils/hooks/auth-check/use-auth-check";
import { useUserInfoStore } from "@src/zustand/user-info";
import { useGetUserInfo } from "@src/utils/hooks/query-hooks/user-info";
import { useEffect } from "react";

function App() {
  const { setUserInfo } = useUserInfoStore();
  const { isAuthenticated, isLoading, isError } = useAuthCheck();
  const { data } = useGetUserInfo();

  useEffect(() => {
    if (data) {
      setUserInfo(data);
    }
  }, [data, setUserInfo]);

  if (isLoading) {
    return <div>content is loading</div>;
  }

  if (isAuthenticated && !isError) {
    return (
      <main className="bg-bg-primary flex gap-2 text-fg-primary">
        <Sidebar />
        <div className="h-screen flex-1 p-2">
          <Navbar />
          <Outlet />
        </div>
      </main>
    );
  }

  return null;
}

export default App;
