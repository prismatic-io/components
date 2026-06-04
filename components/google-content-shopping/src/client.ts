import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import { googleConnection } from "./connections";
import { google } from "googleapis";

const validateConnection = (connection: Connection) => {
  if (connection.key !== googleConnection.key) {
    throw new ConnectionError(connection, "Unknown Connection type provided.");
  }

  if (!connection.token?.access_token) {
    throw new ConnectionError(
      connection,
      "Received valid Connection type but did not find valid access token.",
    );
  }
};

export const createClient = (connection: Connection) => {
  validateConnection(connection);

  const oauth2Client = new google.auth.OAuth2(
    util.types.toString(connection.fields.clientId),
    util.types.toString(connection.fields.clientSecret),
  );

  const token = util.types.toString(connection.token?.access_token);
  oauth2Client.setCredentials({
    access_token: token,
  });

  return google.content({
    version: "v2.1",
    auth: oauth2Client,
  });
};
