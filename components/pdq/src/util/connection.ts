import { type Connection, ConnectionError } from "@prismatic-io/spectral";
import { pdqConnection } from "../connections";
import { API_URL, API_VERSION, INVALID_CONNECTION } from "../constants";
export const validateConnection = (connection: Connection): void => {
  if (![pdqConnection.key].includes(connection.key)) {
    throw new ConnectionError(connection, INVALID_CONNECTION);
  }
};
export const getBaseUrl = (version: string = API_VERSION): string =>
  `${API_URL}/${version}/api`;
export const getAuthHeaders = (
  connection: Connection,
): Record<string, string> => {
  const apiKey = connection.fields.apiKey;
  if (!apiKey) {
    throw new ConnectionError(
      connection,
      "No API key found on the PDQ connection. Provide an API key on the connection configuration.",
    );
  }
  return {
    Authorization: `Bearer ${apiKey}`,
  };
};
