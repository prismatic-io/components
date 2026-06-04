import { type Connection, ConnectionError } from "@prismatic-io/spectral";
import { apiKey } from "../connections/apiKey";
import { oAuth2 } from "../connections/oAuth2";
import { toStr } from "./toStr";

export const validateConnection = (connection: Connection) => {
  if (!connection.key) {
    throw new ConnectionError(connection, "Connection key is required.");
  }

  switch (connection.key) {
    case apiKey.key: {
      const apiKey = toStr(connection.fields.apiKey);
      const username = toStr(connection.fields.username);
      const domain = toStr(connection.fields.domain);

      if (!username) {
        throw new ConnectionError(
          connection,
          "Username is required for this connection.",
        );
      }

      if (!apiKey) {
        throw new ConnectionError(
          connection,
          "API Key is required for this connection.",
        );
      }

      if (!domain) {
        throw new ConnectionError(
          connection,
          "Domain is required for this connection.",
        );
      }

      return;
    }
    case oAuth2.key: {
      const accessToken = toStr(connection.token?.access_token);
      const authorizeUrl = toStr(connection.fields.authorizeUrl);
      const domain = toStr(connection.fields.domain);
      const tokenUrl = toStr(connection.fields.tokenUrl);

      if (!accessToken) {
        throw new ConnectionError(
          connection,
          "Access Token is required for this connection.",
        );
      }

      if (!domain) {
        throw new ConnectionError(
          connection,
          "Domain is required for this connection.",
        );
      }

      if (!authorizeUrl) {
        throw new ConnectionError(
          connection,
          "Authorize URL is required for this connection.",
        );
      }

      if (!tokenUrl) {
        throw new ConnectionError(
          connection,
          "Token URL is required for this connection.",
        );
      }

      return;
    }
    default:
      throw new ConnectionError(
        connection,
        `Connection ${connection.key} is not supported.`,
      );
  }
};
