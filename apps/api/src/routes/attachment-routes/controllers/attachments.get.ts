import { CustomRequest } from "@src/types/customRequest";

import { AttachmentRequestQueryParams } from "@repo/shared-types/api/get-attachment";
import { Response } from "express";
import { fetchAttachmentByID } from "@src/services/gmail-service";

export const getAttachmemtsById = async (
  req: CustomRequest<{ query: AttachmentRequestQueryParams }>,
  res: Response,
) => {
  const { query } = req;
  const { id, messageID } = query;

  const attachmentData = await fetchAttachmentByID({ id, messageID });

  res.json({ data: attachmentData });
};
