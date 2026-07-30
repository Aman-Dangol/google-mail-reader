import { type ApiAttachmentType } from "../utils/api-attachment-types";

export interface AttachmentRequestQueryParams {
  messageID: string;
  id: string;
}
export interface AttachmentResponse {
  data: ApiAttachmentType;
}
