import { credentialSetter } from "@src/middlewares/credential-setter";
import { getAttachmemtsById } from "@src/routes/attachment-routes/controllers/attachments.get";

import express from "express";

const app = express.Router();

app.get("/:id", credentialSetter, getAttachmemtsById);

export { app as AttachmentRoutes };
