import type { Mails } from "../utils/api-mail-types";

export interface GetAllMailsReponse {
  data: Mails[];
  nextPageToken: string | null | undefined;
  estimateSize: number | null | undefined;
}
