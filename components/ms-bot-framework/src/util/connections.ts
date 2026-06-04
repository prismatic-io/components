import { type Connection, util } from "@prismatic-io/spectral";
import { clientCredentials, directLine } from "../connections";

const unsupportedConnectionError = (connectionKey: string): void => {
  throw new Error(`Unsupported connection ${connectionKey}.`);
};

export const getToken = (connection: Connection) => {
  const connectionKey = connection.key;

  switch (connectionKey) {
    case clientCredentials.key:
      return util.types.toString(connection.token?.access_token);
    case directLine.key:
      return util.types.toString(connection.fields?.directLineSecret);
    default:
      unsupportedConnectionError(connectionKey);
  }
};

export const getBaseUrl = (connection: Connection, serviceUrl: string, apiVersion: string) => {
  const connectionKey = connection.key;
  const baseUrl = `${serviceUrl}${apiVersion}`;
  switch (connectionKey) {
    case clientCredentials.key:
      return baseUrl;
    case directLine.key:
      return `${baseUrl}/directline`;
    default:
      unsupportedConnectionError(connectionKey);
  }
};
