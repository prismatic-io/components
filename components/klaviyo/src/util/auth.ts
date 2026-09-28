import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
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
export const getAuthorizationHeader = (
  connection: Connection,
): {
  Authorization: string;
} => {
  let authorization = "";
  switch (connection.key) {
    case "klaviyoApiKeyConnection":
      authorization = `Klaviyo-API-Key ${util.types.toString(connection.fields.apiKey)}`;
      break;
    case "klaviyoOAuth2Connection":
      authorization = `Bearer ${util.types.toString(connection.token?.access_token)}`;
      break;
  }
  return { Authorization: authorization };
};
