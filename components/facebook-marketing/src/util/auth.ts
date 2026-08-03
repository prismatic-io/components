import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import connections, {
  clientCredentials,
  conversionsToken,
} from "../connections";
import { API_URL, DEFAULT_VERSION } from "../constants";
export const validateConversionsConnection = (connection: Connection) => {
  if (connection.key !== conversionsToken.key) {
    throw new Error(
      "The provided connection is not a valid Conversions API connection.",
    );
  }
};
export const validateConnection = (connection: Connection): void => {
  const connectionKeys = connections.map((c) => c.key);
  if (!connectionKeys.includes(connection.key)) {
    throw new ConnectionError(
      connection,
      `Unsupported connection ${connection.key}.`,
    );
  }
};
export const getBaseUrl = (version = DEFAULT_VERSION): string =>
  `${API_URL}/v${version}.0`;
export const getAuthHeaders = (
  connection: Connection,
): Record<string, string> => {
  const token = util.types.toString(
    connection.token?.access_token || connection.fields.token,
  );
  return { Authorization: `Bearer ${token}` };
};
export const clientCredentialsConnection = (connection: Connection) => {
  if (connection.key !== clientCredentials.key) {
    throw new Error(
      `Invalid connection provided, expected ${clientCredentials.display.label}`,
    );
  }
};
export const getAppId = (connection: Connection) => {
  return util.types.toString(connection.fields.clientId);
};
