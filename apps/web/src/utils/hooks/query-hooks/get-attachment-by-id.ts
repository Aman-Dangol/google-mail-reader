import { useGet } from "@src/utils/axios/axios-get";
import {
  type AttachmentRequestQueryParams,
  type AttachmentResponse,
} from "@repo/shared-types/api/get-attachment";

export const useGetAttachmentByID = ({
  id,
  messageID,
}: AttachmentRequestQueryParams) =>
  useGet<AttachmentResponse, AttachmentRequestQueryParams>({
    queryKey: [id, messageID],
    url: "/attachments/" + id,
    options: {
      enabled: false,
    },
    params: { id, messageID },
  });
