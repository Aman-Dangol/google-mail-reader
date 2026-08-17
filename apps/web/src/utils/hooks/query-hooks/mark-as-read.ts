import { usePost } from "@src/utils/axios/axios-post";

export const usePostMarkAsRead = () =>
  usePost<unknown, { mailId: string }>({ url: `/mails/mark-as-read/` });
