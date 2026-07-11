import {
  getAllMails,
  getSingleMail,
  getSingleMailMetaData,
} from "@src/services/gmail-service";
import { CustomRequest } from "@src/types/customRequest";
import { logger } from "@src/winston";
import { Response } from "express";
import type { MailType } from "@repo/shared-types/utils/api-mail-types";

export const getMails = async (
  req: CustomRequest<{ query: { mailType?: MailType } }>,
  res: Response,
) => {
  const mailType = req.query.mailType || "Inbox";
  logger.info("user tried to get mails", mailType);

  const allMailsIdsList = await getAllMails(mailType);
  const allMailIDs = allMailsIdsList.messages;

  const allMails = await Promise.all(
    (allMailIDs ?? []).map((id) => getSingleMailMetaData(id.id ?? "")),
  );

  const responseObj = {
    data: allMails,
    nextPageToken: allMailsIdsList.nextPageToken,
    estimateSize: allMailsIdsList.resultSizeEstimate,
  };

  res.json(responseObj);
};

export const getMailById = async (
  req: CustomRequest<{ params: { id: string } }>,
  res: Response,
) => {
  const { id } = req.params;
  const mailData = await getSingleMail(id);

  res.json(mailData);
};
