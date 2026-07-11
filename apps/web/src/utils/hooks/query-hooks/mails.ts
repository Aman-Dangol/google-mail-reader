import type { MailType } from "@repo/shared-types/utils/api-mail-types";
import type { GetAllMailsReponse } from "@repo/shared-types/api/get-all-mails";
import { useGet } from "@src/utils/axios/axios-get";

export const useGetAllMails = (mailType: MailType) =>
  useGet<GetAllMailsReponse>({
    queryKey: ["Mails", mailType],
    url: "mails/getmails",
    params: { mailType },
  });
