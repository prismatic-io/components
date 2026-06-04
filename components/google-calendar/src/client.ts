import { auth, calendar } from "@googleapis/calendar";
import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import { googleConnection } from "./connections";

interface CreateClientPrams {
  connection: Connection;
}

const validateConnection = (connection: Connection) => {
  if (connection.key !== googleConnection.key) {
    throw new ConnectionError(connection, "Unknown Connection type provided.");
  }

  if (!connection.token?.access_token) {
    throw new ConnectionError(
      connection,
      "Received valid Connection type but did not find valid access token."
    );
  }
};

export const createClient = ({ connection }: CreateClientPrams) => {
  validateConnection(connection);

  const oauth2Client = new auth.OAuth2(
    util.types.toString(connection.fields.clientId),
    util.types.toString(connection.fields.clientSecret)
  );

  const token = util.types.toString(connection.token.access_token);
  oauth2Client.setCredentials({
    access_token: token,
  });

  return calendar({
    version: "v3",
    auth: oauth2Client,
  });
};

export const getAccessToken = ({ connection }: CreateClientPrams) => {
  validateConnection(connection);

  return util.types.toString(connection.token.access_token);
};
