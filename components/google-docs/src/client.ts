import { Connection, ConnectionError } from "@prismatic-io/spectral";
import { docs, auth } from "@googleapis/docs";
import { googleDocsOauth2 } from "./connections";

const validateConnection = (connection: Connection) => {
  if (connection.key !== googleDocsOauth2.key) {
    throw new ConnectionError(connection, "Unknown Connection type provided.");
  }

  if (!connection.token?.access_token) {
    throw new ConnectionError(
      connection,
      "Received valid Connection type but did not find valid access token."
    );
  }
};

export const getClient = (connection: Connection) => {
  validateConnection(connection);

  const token = connection.token?.access_token;
  const oauth2Client = new auth.OAuth2();
  oauth2Client.setCredentials({ access_token: `${token}` });

  return docs({
    version: "v1",
    auth: oauth2Client,
  });
};

export const getToken = (connection: Connection) => {
  validateConnection(connection);
  return connection.token?.access_token;
};
