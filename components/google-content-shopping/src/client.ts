import { type Connection, util } from "@prismatic-io/spectral";
import {
  createClient as createHttpClient,
  type HttpClient,
} from "@prismatic-io/spectral/dist/clients/http";
import { google } from "googleapis";
import { getAccessToken, getClientPropsMerchant } from "./util";
export const createClientMerchant = (
  connection: Connection,
  debug = false,
): HttpClient => {
  const { token, baseUrl } = getClientPropsMerchant(connection);
  return createHttpClient({
    baseUrl,
    debug,
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  });
};
export const createClient = (connection: Connection, debug = false) => {
  void debug;
  const accessToken = getAccessToken(connection);
  const oauth2Client = new google.auth.OAuth2(
    util.types.toString(connection.fields.clientId),
    util.types.toString(connection.fields.clientSecret),
  );
  oauth2Client.setCredentials({
    access_token: accessToken,
  });
  return google.content({
    version: "v2.1",
    auth: oauth2Client,
  });
};
