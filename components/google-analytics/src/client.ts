import { analytics, auth } from "@googleapis/analytics";
import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import { googleConnection } from "./connections";

export const baseUrl = "https://www.googleapis.com/analytics/v3";

interface CreateClientParams {
  connection: Connection;
}
export const createClient = ({ connection }: CreateClientParams) => {
  if (connection.key !== googleConnection.key) {
    throw new ConnectionError(connection, "Unknown Connection type provided.");
  }

  if (!connection.token?.access_token) {
    throw new ConnectionError(connection, "Did not receive a valid token.");
  }

  const oauth2Client = new auth.OAuth2();
  oauth2Client.setCredentials({
    access_token: util.types.toString(connection.token.access_token),
  });

  return analytics({
    version: "v3",
    auth: oauth2Client,
  });
};
