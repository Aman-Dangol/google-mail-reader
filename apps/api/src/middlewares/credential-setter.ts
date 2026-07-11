import { NextFunction, Response } from "express";
import { oAuth2client, setCredentials } from "../auth";
import { CustomRequest } from "../types/customRequest";
import { oauth2_v2 } from "googleapis";

const credentialSetter = async (
  req: CustomRequest,
  res: Response<unknown, { userData: oauth2_v2.Schema$Userinfo }>,
  next: NextFunction,
) => {
  const { access_token, refresh_token } = req.cookies;

  if (!refresh_token) {
    res.status(401).json({ message: "missing credentials" });
    return;
  }

  // if access token is not present try to refresh it using refresh token
  if (!access_token) {
    try {
      setCredentials({ refresh_token });
      const tokens = await oAuth2client.refreshAccessToken();
      setCredentials({
        access_token: tokens.credentials.access_token,
        refresh_token: tokens.credentials.refresh_token || refresh_token,
      });

      // update access token in cookies
      res.cookie("access_token", tokens.credentials.access_token, {
        maxAge: 1000 * 60 * 60,
        sameSite: "none",
        secure: true,
      });
    } catch {
      res.status(401).json({ message: "failed to refresh token" });
      return;
    }
  } else {
    setCredentials({ access_token, refresh_token });
  }

  next();
};

export { credentialSetter };
