import { CustomRequest } from "@src/types/customRequest";
import { Response } from "express";
import * as gmailService from "@src/services/gmail-service";

export const archiveMail = async (
  req: CustomRequest<{ body: { mailId: string } }>,
  res: Response,
) => {
  const { mailId } = req.body;
  if (!mailId) {
    res.json({ message: "mail id not provided" }).status(404);
    return;
  }

  const result = await gmailService.archiveMail(mailId);
  if (result.id) res.json({ message: "mail archived" });
};
export const unarchiveMail = async (
  req: CustomRequest<{ body: { mailId: string } }>,
  res: Response,
) => {
  const { mailId } = req.body;
  if (!mailId) {
    res.json({ message: "mail id not provided" }).status(404);
    return;
  }

  const result = await gmailService.unArchiveMail(mailId);
  if (result.id) res.json({ message: "mail unArchived" });
};

export const markAsRead = async (
  req: CustomRequest<{ body: { mailId: string } }>,
  res: Response,
) => {
  const { mailId } = req.body;
  if (!mailId) {
    res.json({ message: "mail id not provided" }).status(404);
    return;
  }

  const result = await gmailService.markAsRead(mailId);
  if (result.id) res.json({ message: "marked as read" });
};
