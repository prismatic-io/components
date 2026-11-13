import type { Connection } from "@prismatic-io/spectral";
import { ConnectionError } from "@prismatic-io/spectral";
import connections, { oauthClientCredentials } from "../connections";

export const validateConnection = (connection: Connection): boolean => {
  if (!connections.map((c) => c.key).includes(connection.key)) {
    throw new ConnectionError(connection, `Invalid connection: ${connection.key}`);
  }
  return true;
};

export const computeEndpointBasedOnConnection = (
  connection: Connection,
  endpoint: string,
): string => {
  if (connection.key !== oauthClientCredentials.key) {
    return endpoint;
  }

  return endpoint.replace("/me", `/users/${connection.fields.userId}`);
};

export const computeResourceBasedOnConnection = (
  connection: Connection,
  resource: string,
): string => computeEndpointBasedOnConnection(connection, `/${resource}`).slice(1);
