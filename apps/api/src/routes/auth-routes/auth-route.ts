import { credentialSetter } from "@src/middlewares/credential-setter";
import {
  getAuth,
  getAuthUrl,
  logout,
} from "@src/routes/auth-routes/controllers/auth.get";
import { getCurrentUserInfo } from "@src/routes/user-routes/controllers/user.get";
import express from "express";

const app = express.Router();

app.get("/getUrl", getAuthUrl);

app.get("/login", getAuth);

app.get("/getUserInfo", credentialSetter, getCurrentUserInfo);
app.get("/logout", credentialSetter, logout);

export { app as AuthRouter };
