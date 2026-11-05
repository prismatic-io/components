import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import { Auth, google, type pubsub_v1 } from "googleapis";
import { googleConnection, googlePrivateKeyConnection } from "./connections";
import type { Version } from "./types";

const UNKNOWN_CONNECTION_ERROR = "Unknown Connection type provided.";

const validKeys = [googleConnection.key, googlePrivateKeyConnection.key];
const validateConnection = (connection: Connection) => {
  if (!validKeys.includes(connection.key)) {
    throw new ConnectionError(connection, UNKNOWN_CONNECTION_ERROR);
  }

  if (connection.key === googleConnection.key && !connection.token?.access_token) {
    throw new ConnectionError(
      connection,
      "Received valid Connection type but did not find valid access token.",
    );
  }
};

const getPrivateKeyAuth = (connection: Connection): Auth.GoogleAuth => {
  const cleanedScopesString = util.types.toString(connection.fields.scopes).replace(/\s+/g, " ");
  const scopesArray = cleanedScopesString.split(" ");
  return new Auth.GoogleAuth({
    projectId: util.types.toString(connection.fields.projectId),
    credentials: {
      client_email: util.types.toString(connection.fields.clientEmail),
      private_key: util.types.toString(connection.fields.privateKey).replace(/\\n/g, "\n"),
    },
    scopes: scopesArray,
  });
};

export const getGoogleAuth = (connection: Connection): Auth.GoogleAuth | Auth.OAuth2Client => {
  switch (connection.key) {
    case googleConnection.key: {
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
    case googlePrivateKeyConnection.key: {
      const auth = getPrivateKeyAuth(connection);
      return auth;
    }
    default:
      throw new ConnectionError(connection, UNKNOWN_CONNECTION_ERROR);
  }
};

function getClient(connection: Connection, version: Version = "v1"): pubsub_v1.Pubsub {
  const auth = getGoogleAuth(connection);
  return google.pubsub({
    version,
    auth,
  });
}

export const createClient = (connection: Connection, version: Version = "v1") => {
  validateConnection(connection);
  return getClient(connection, version);
};
