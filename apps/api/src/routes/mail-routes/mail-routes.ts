import { credentialSetter } from "@src/middlewares/credential-setter";
import {
  getMailById,
  getMails,
} from "@src/routes/mail-routes/controllers/mails.get";

import express from "express";

const app = express.Router();

app.get("/getmails", credentialSetter, getMails);

app.get("/:id", credentialSetter, getMailById);

export { app as MailRouter };
