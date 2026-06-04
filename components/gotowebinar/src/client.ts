import { Connection, ConnectionError, util } from "@prismatic-io/spectral";
import { gotoWebinarOAuth2Connection } from "./connections";
import { createClient } from "@prismatic-io/spectral/dist/clients/http";
import { ClientProps } from "./interfaces";

interface AuthorizationHeaders {
  Authorization: string;
}

export const getAuthorizationHeaders = ({
  connection,
}: {
  connection: Connection;
}): AuthorizationHeaders => {
  switch (connection.key) {
    case gotoWebinarOAuth2Connection.key: {
      const token = util.types.toString(connection.token?.access_token);
      if (!token) {
        throw new ConnectionError(
          connection,
          "No access token found in connection",
        );
      }

      return {
        Authorization: `Bearer ${token}`,
      };
    }
    default: {
      throw new ConnectionError(connection, "Unsupported Connection");
    }
  }
};

export const getClientProps = (connection: Connection): ClientProps => {
  const token = util.types.toString(connection.token?.access_token);
  const organizerKey = util.types.toString(connection.fields?.organizerKey);
  if (!token) {
    throw new ConnectionError(
      connection,
      "No access token found in connection",
    );
  }

  if (!organizerKey) {
    throw new ConnectionError(
      connection,
      "No organizer key found in connection",
    );
  }

  return {
    token,
    organizerKey,
    baseUrl: "https://api.getgo.com/G2W/rest/v2",
  };
};

export const createGotoWebinarClient = (
  connection: Connection,
  debug = false,
) => {
  const headers = getAuthorizationHeaders({ connection });
  const { baseUrl } = getClientProps(connection);
  return {
    organizerKey: util.types.toString(connection.fields?.organizerKey),
    client: createClient({
      baseUrl,
      headers: {
        ...headers,
        "Content-Type": "application/json",
        Accept: "application/vnd.citrix.g2wapi-v1.1+json",
      },
      debug,
    }),
  };
};
