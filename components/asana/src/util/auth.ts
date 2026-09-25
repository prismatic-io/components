import { type Connection, ConnectionError } from "@prismatic-io/spectral";
import connections from "../connections";
export const validateConnection = (connection: Connection): void => {
  const connectionKeys = connections.map((c) => c.key);
  if (!connectionKeys.includes(connection.key)) {
    throw new ConnectionError(
      connection,
      `Unsupported connection ${connection.key}.`,
    );
  }
};
export const getBearerToken = (connection: Connection): string => {
  const token = connection?.token?.access_token || connection?.fields?.apiKey;
  return `Bearer ${token}`;
};
