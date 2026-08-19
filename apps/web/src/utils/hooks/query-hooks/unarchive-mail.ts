import { usePost } from "@src/utils/axios/axios-post";
import { useInvalidateMailData } from "@src/utils/hooks/query-hooks/mails";

export const useUnArhiveMail = () => {
  const invalidateMailData = useInvalidateMailData();

  return usePost<unknown, { mailId: string }>({
    url: `/mails/unarchive-mail/`,
    options: {
      onSuccess: async () => {
        await invalidateMailData();
      },
    },
  });
};
