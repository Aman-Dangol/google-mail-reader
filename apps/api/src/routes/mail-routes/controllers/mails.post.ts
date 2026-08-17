import { CustomRequest } from "@src/types/customRequest";
import { Response } from "express";
import {
  archiveMail as archMail,
  markAsRead as markRead,
} from "@src/services/gmail-service";

export const archiveMail = async (
  req: CustomRequest<{ body: { mailId: string } }>,
  res: Response,
) => {
  const { mailId } = req.body;
  if (!mailId) {
    res.json({ message: "mail id not provided" }).status(404);
    return;
  }

  const result = await archMail(mailId);
  if (result.id) res.json({ message: "mail archived" });
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

  const result = await markRead(mailId);
  if (result.id) res.json({ message: "marked as read" });
};
