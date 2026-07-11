import { credentialSetter } from "@src/middlewares/credential-setter";
import {
  getAuth,
  getAuthUrl,
} from "@src/routes/auth-routes/controllers/auth.get";
import { getCurrentUserInfo } from "@src/routes/user-routes/controllers/user.get";
import express from "express";

const app = express.Router();

app.get("/getUrl", getAuthUrl);

app.get("/login", getAuth);

app.get("/getUserInfo", credentialSetter, getCurrentUserInfo);

export { app as AuthRouter };
