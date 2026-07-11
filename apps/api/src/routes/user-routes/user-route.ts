import { credentialSetter } from "@src/middlewares/credential-setter";
import { getCurrentUserInfo } from "@src/routes/user-routes/controllers/user.get";
import express from "express";

const app = express.Router();

app.get("/getUserInfo", credentialSetter, getCurrentUserInfo);

export { app as UserRouter };
