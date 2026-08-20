import { Button } from "@src/components/button";
import { useLogoutQuery } from "@src/utils/hooks/query-hooks/logout";
import { useQueryClient } from "@tanstack/react-query";

export const LogoutButton = () => {
  const { refetch: logout } = useLogoutQuery();
  const qc = useQueryClient();
  const handleLogout = () => {
    logout();
    qc.invalidateQueries();
  };
  return (
    <Button
      className='text-fg-primary w-full bg-red-600'
      onClick={handleLogout}>
      Logout
    </Button>
  );
};
