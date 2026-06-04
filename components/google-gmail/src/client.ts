import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import { gmail, auth, gmail_v1 } from "@googleapis/gmail";
import { pubsub, auth as pubsubAuth } from "@googleapis/pubsub";
import Gmail = gmail_v1.Gmail;
import { gmailOauth, gmailServiceAccountAuth } from "./connections";
import type { GoogleKeyFile } from "./interfaces/KeyFile";
import type { OAuth2Client, JWT } from "google-auth-library";

export const createClient = async (connection: Connection): Promise<Gmail> => {
  let client: OAuth2Client | JWT;
  switch (connection.key) {
    case gmailOauth.key: {
      const { access_token: token } = connection.token;
      if (!token) {
        throw new ConnectionError(connection, "Did not receive a valid token.");
      }

      const oauth2Client = new auth.OAuth2();
      oauth2Client.setCredentials({ access_token: `${token}` });

      client = oauth2Client;

      break;
    }
    case gmailServiceAccountAuth.key: {
      const keyFile = util.types.toObject(connection.fields.keyFile) as GoogleKeyFile;
      const user = util.types.toString(connection.fields.user);
      if (!keyFile) {
        throw new ConnectionError(connection, "Did not receive a valid key file.");
      }

      const jwtClient = new auth.JWT({
        keyId: keyFile.private_key_id,
        key: keyFile.private_key.replace(/\\n/g, "\n"),
        email: keyFile.client_email,
        scopes: util.types.toString(connection.fields.scopes),
        subject: user,
      });

      const credentials = await jwtClient.authorize();
      jwtClient.setCredentials(credentials);

      client = jwtClient;
      break;
    }
    default:
      throw new Error("Invalid connection key.");
  }

  return gmail({
    version: "v1",
    auth: client,
  });
};

export const createPubSubClient = async (connection: Connection) => {
  switch (connection.key) {
    case gmailOauth.key: {
      const oauth2Client = new pubsubAuth.OAuth2(
        util.types.toString(connection.fields.clientId),
        util.types.toString(connection.fields.clientSecret),
      );

      const token = util.types.toString(connection.token?.access_token);
      oauth2Client.setCredentials({
        access_token: token,
      });

      return pubsub({
        version: "v1",
        auth: oauth2Client,
      });
    }
    case gmailServiceAccountAuth.key: {
      const keyFile = util.types.toObject(connection.fields.keyFile) as GoogleKeyFile;
      const user = util.types.toString(connection.fields.user);
      if (!keyFile) {
        throw new ConnectionError(connection, "Did not receive a valid key file.");
      }

      const jwtClient = new pubsubAuth.JWT({
        keyId: keyFile.private_key_id,
        key: keyFile.private_key.replace(/\\n/g, "\n"),
        email: keyFile.client_email,
        scopes: util.types.toString(connection.fields.scopes),
        subject: user,
      });

      const credentials = await jwtClient.authorize();
      jwtClient.setCredentials(credentials);

      return pubsub({
        version: "v1",
        auth: jwtClient,
      });
    }

    default:
      throw new Error("Invalid connection key.");
  }
};

export const getToken = async (connection: Connection) => {
  switch (connection.key) {
    case gmailOauth.key: {
      const { access_token: token } = connection.token;
      if (!token) {
        throw new ConnectionError(connection, "Did not receive a valid token.");
      }
      return token;
    }
    case gmailServiceAccountAuth.key: {
      const keyFile = util.types.toObject(connection.fields.keyFile) as GoogleKeyFile;
      const user = util.types.toString(connection.fields.user);
      if (!keyFile) {
        throw new ConnectionError(connection, "Did not receive a valid key file.");
      }

      const jwtClient = new auth.JWT({
        keyId: keyFile.private_key_id,
        key: keyFile.private_key.replace(/\\n/g, "\n"),
        email: keyFile.client_email,
        scopes: util.types.toString(connection.fields.scopes),
        subject: user,
      });

      const tokenResponse = await jwtClient.authorize();

      if (!tokenResponse.access_token) {
        throw new ConnectionError(
          connection,
          "Failed to obtain access token from service account.",
        );
      }

      return tokenResponse.access_token;
    }
    default:
      throw new ConnectionError(connection, "Invalid connection key.");
  }
};
