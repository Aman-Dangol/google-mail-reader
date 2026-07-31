import express from "express";
import cp from "cookie-parser";
import cors from "cors";

import { AuthRouter } from "@src/routes/auth-routes/auth-route";
import { UserRouter } from "@src/routes/user-routes/user-route";
import { MailRouter } from "@src/routes/mail-routes/mail-routes";
import { AttachmentRoutes } from "@src/routes/attachment-routes/attachment-routes";

const app = express();

app.use(cp());
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(
  cors({
    origin: ["http://127.0.0.1:5500/", "http://localhost:5500/"],
    credentials: true,
  }),
);

app.use("/auth", AuthRouter);
app.use("/mails", MailRouter);
app.use("/users", UserRouter);
app.use("/attachments", AttachmentRoutes);

console.info("API server listening on port 8000");

app.listen(8000);
