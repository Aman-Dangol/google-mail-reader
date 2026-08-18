import { usePost } from "@src/utils/axios/axios-post";
import { MailContext } from "@src/utils/context/selected-mail-context";
import { useInvalidateMailData } from "@src/utils/hooks/query-hooks/mails";
import { useContext } from "react";

export const usePostArhiveMail = () => {
  const { setSelectedMail } = useContext(MailContext);

  const invalidateMailData = useInvalidateMailData();

  return usePost<unknown, { mailId: string }>({
    url: `/mails/archive-mail/`,
    options: {
      onSuccess: async () => {
        await invalidateMailData();
        setSelectedMail(undefined);
      },
    },
  });
};
