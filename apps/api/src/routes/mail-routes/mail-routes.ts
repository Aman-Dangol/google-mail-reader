import { credentialSetter } from "@src/middlewares/credential-setter";
import {
  getMailById,
  getMails,
} from "@src/routes/mail-routes/controllers/mails.get";
import {
  archiveMail,
  markAsRead,
} from "@src/routes/mail-routes/controllers/mails.post";

import express from "express";

const app = express.Router();

app.get("/getmails", credentialSetter, getMails);

app.post("/mark-as-read", credentialSetter, markAsRead);
app.post("/archive-mail", credentialSetter, archiveMail);
app.get("/:id", credentialSetter, getMailById);

export { app as MailRouter };
