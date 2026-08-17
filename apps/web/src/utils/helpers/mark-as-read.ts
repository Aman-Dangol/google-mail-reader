import type { GetAllMailsReponse } from "@repo/shared-types/api/get-all-mails";
import { NavContext } from "@src/utils/context/nav-context";
import { useQueryClient, type InfiniteData } from "@tanstack/react-query";
import { useContext } from "react";

export const useMarkAsread = () => {
  const mailType = useContext(NavContext).currentTab;
  const queryKey = ["mails", mailType];
  const qc = useQueryClient();

  const markAsRead = (mailId: string) =>
    qc.setQueryData<InfiniteData<GetAllMailsReponse>>(queryKey, (old) => {
      if (!old) return old;

      let found = false;

      const pages = old.pages.map((page) => ({
        ...page,
        data: page.data.map((mail) => {
          if (mail.id !== mailId) return mail;
          found = true;
          return {
            ...mail,
            labelIds: mail.labelIds?.filter(
              (l) => l.toLowerCase() !== "unread",
            ),
          };
        }),
      }));

      if (!found) return old; // mail not found, no-op

      return { ...old, pages };
    });

  return markAsRead;
};
