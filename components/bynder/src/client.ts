import { type Connection, util } from "@prismatic-io/spectral";
import { createClient as createHttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { oauth, oauthCredentials } from "./connections/index";

export const validateConnection = (connection: Connection) => {
  if (connection.key !== oauth.key && connection.key !== oauthCredentials.key) {
    throw new Error("Invalid connection type");
  }
};

export const getBynderURL = (connection: Connection) => {
  const authorizeUrl = util.types.toString(connection.fields.authorizeUrl);
  if (authorizeUrl) {
    const bynderURL = new URL(authorizeUrl);
    return bynderURL.origin;
  } else {
    const tokenURL = util.types.toString(connection.fields.tokenUrl);
    const bynderURL = new URL(tokenURL);
    return bynderURL.origin;
  }
};

export const createClient = (connection: Connection, debug = false) => {
  validateConnection(connection);
  return createHttpClient({
    debug,
    baseUrl: `${getBynderURL(connection)}/api/v4/`,
    headers: {
      Authorization: `Bearer ${connection.token?.access_token}`,
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
  });
};

export const createApiClient = (connection: Connection, debug = false) => {
  validateConnection(connection);
  return createHttpClient({
    debug,
    baseUrl: `${getBynderURL(connection)}/api/`,
    headers: {
      Authorization: `Bearer ${connection.token?.access_token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

export const createWorkflowClient = (connection: Connection, debug = false) => {
  validateConnection(connection);
  return createHttpClient({
    debug,
    baseUrl: `${getBynderURL(connection)}/api/workflow`,
    headers: {
      Authorization: `Bearer ${connection.token?.access_token}`,
    },
  });
};
