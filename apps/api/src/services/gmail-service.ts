import { gmail_v1, google } from "googleapis";
import { oAuth2client } from "../auth";
import { MailType } from "@repo/shared-types/utils/api-mail-types";
import { AttachmentRequestQueryParams } from "@repo/shared-types/api/get-attachment";

export const GmailService = google.gmail({ auth: oAuth2client, version: "v1" });

const queryMap: Record<MailType, string> = {
  Inbox: "in:inbox",
  Sent: "in:sent",
  Drafts: "in:draft",
  All: "in:anywhere",
};

// get mails based on the mail type
export const getAllMails = async (
  mailType: MailType = "Inbox",
  pageToken: string = "",
): Promise<gmail_v1.Schema$ListMessagesResponse> => {
  const res = await GmailService.users.messages.list({
    userId: "me",
    maxResults: 25,
    pageToken,
    q: queryMap[mailType],
  });

  return res.data;
};

export const getSingleMailMetaData = async (id: string) => {
  const res = await GmailService.users.messages.get({
    userId: "me",
    id,
  });

  return res.data;
};

export const getSingleMail = async (id: string) => {
  const res = await GmailService.users.messages.get({
    userId: "me",
    id,
    format: "metadata",
  });

  return res.data;
};

export const fetchAttachmentByID = async ({
  id,
  messageID,
}: AttachmentRequestQueryParams) => {
  const res = await GmailService.users.messages.attachments.get({
    id,
    messageId: messageID,
    userId: "me",
  });

  return res.data;
};

export const archiveMail = async (mailId: string) => {
  const res = await GmailService.users.messages.modify({
    userId: "me",
    id: mailId,
    requestBody: {
      removeLabelIds: ["INBOX"],
    },
  });

  return res.data;
};
