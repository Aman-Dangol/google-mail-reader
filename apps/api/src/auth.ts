import { google } from "googleapis";

import { Credentials } from "google-auth-library";

export type OAuth2ClientType = InstanceType<typeof google.auth.OAuth2>;

const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUrl = process.env.REDIRECT_URL;

const oAuth2client: OAuth2ClientType = new google.auth.OAuth2(
  clientID,
  clientSecret,
  redirectUrl,
);

const oauth2 = google.oauth2({
  auth: oAuth2client,
  version: "v2",
});

const Scopes = [
  "https://mail.google.com/",
  "openid",
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
];

google.options({
  auth: oAuth2client,
});

const url = oAuth2client.generateAuthUrl({
  access_type: "offline",
  prompt: "consent",
  scope: Scopes,
});

/**
 *
 * @param code code from google to get refresh token and access token
 * @returns tokens
 */

export const getTokens = async (code: string): Promise<Credentials> => {
  const { tokens } = await oAuth2client.getToken(code);

  return tokens;
};

// set credentials
export const setCredentials = (data: Credentials) => {
  const { access_token, refresh_token } = data;
  oAuth2client.setCredentials({
    access_token: access_token as string | null,
    refresh_token: refresh_token as string | null,
  });
};

export const getUserInfo = async () => {
  const userinfo = await oauth2.userinfo.get();

  return userinfo.data;
};

//service to work with mails
export const mail = google.gmail({ auth: oAuth2client, version: "v1" });

export { url as authUrl, oAuth2client, oauth2 };
