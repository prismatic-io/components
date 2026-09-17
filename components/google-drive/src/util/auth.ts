import { auth } from "@googleapis/drive";
import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import type { Auth } from "googleapis";
export const getToken = (connection: Connection): string => {
  const { access_token: token } = connection.token;
  if (!token) {
    throw new ConnectionError(connection, "Did not receive a valid token.");
  }
  return util.types.toString(token);
};
export const getOauth = (token: string): Auth.OAuth2Client => {
  const oauth2Client = new auth.OAuth2();
  oauth2Client.setCredentials({ access_token: `${token}` });
  return oauth2Client;
};
