import { type Connection, ConnectionError } from "@prismatic-io/spectral";
import connections from "../connections";
import { LEGACY_CONNECTION_KEY } from "../constants";
export const validateConnection = (connection: Connection): void => {
  const connectionKeys = connections.map((c) => c.key);
  if (!connectionKeys.includes(connection.key)) {
    throw new ConnectionError(
      connection,
      `Unsupported connection ${connection.key}.`,
    );
  }
};
export const requireApiKeyConnection = (connection: Connection): void => {
  if (connection.key === LEGACY_CONNECTION_KEY) {
    throw new ConnectionError(
      connection,
      "This operation requires the API Key connection, but the Basic Authentication (Deprecated) connection was provided. Switch the step to an API Key connection, or use the Basic Auth variant of this action.",
    );
  }
  if (!connection.fields.apiKey) {
    throw new ConnectionError(
      connection,
      "No API key was provided on the Odoo connection. Add an API key and try again.",
    );
  }
};
