import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import { google } from "googleapis";
import { googleConnection, googleServiceAccount } from "./connections";

const validateConnection = (connection: Connection) => {
  if (
    connection.key !== googleConnection.key &&
    connection.key !== googleServiceAccount.key
  ) {
    throw new ConnectionError(connection, "Unknown Connection type provided.");
  }

  if (
    !connection.token?.access_token &&
    !connection.fields.privateKey &&
    !connection.fields.clientEmail &&
    !connection.fields.scopes
  ) {
    throw new ConnectionError(
      connection,
      "Received valid Connection type but did not find valid access token.",
    );
  }
};

const generateAuthentication = (connection: Connection) => {
  if (connection.key === googleServiceAccount.key) {
    const { clientEmail, privateKey, scopes } = connection.fields;
    const scopesArray = util.types.toString(scopes).split(" ");
    const googleAuth = new google.auth.GoogleAuth({
      credentials: {
        client_email: util.types.toString(clientEmail),
        private_key: util.types.toString(privateKey).replace(/\\n/g, "\n"),
      },
      scopes: scopesArray,
    });
    return googleAuth;
  } else if (connection.key === googleConnection.key) {
    const oauth2Client = new google.auth.OAuth2(
      util.types.toString(connection.fields.clientId),
      util.types.toString(connection.fields.clientSecret),
    );

    const token = util.types.toString(connection.token?.access_token);
    oauth2Client.setCredentials({
      access_token: token,
    });
    return oauth2Client;
  }
  throw new ConnectionError(connection, "Unknown Connection type provided.");
};

export const createClient = (connection: Connection) => {
  validateConnection(connection);

  const auth = generateAuthentication(connection);

  return google.bigquery({
    version: "v2",
    auth: auth,
  });
};
