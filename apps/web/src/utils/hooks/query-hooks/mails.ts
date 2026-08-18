import type { MailType } from "@repo/shared-types/utils/api-mail-types";
import type { GetAllMailsReponse } from "@repo/shared-types/api/get-all-mails";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@src/utils/axios/axios";

export const useGetAllMailInfiniteQuery = (mailType: MailType) =>
  useInfiniteQuery({
    queryKey: ["mails", mailType],
    queryFn: async ({ pageParam }) => {
      const response = await api.get<GetAllMailsReponse>(`mails/getmails`, {
        params: {
          mailType,
          pageToken: pageParam,
        },
      });
      return response.data;
    },
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage.nextPageToken,
  });

export const useInvalidateMailData = () => {
  const qc = useQueryClient();

  return async () => {
    qc.invalidateQueries({ queryKey: ["mails"] });
  };
};
