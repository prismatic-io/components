import { type Connection, util } from "@prismatic-io/spectral";
import { createClient } from "@prismatic-io/spectral/dist/clients/http";
import { personalAccessToken, workspaceServicePrincipal } from "./connections";

export const getHostAndApiKey = (
  connection: Connection,
): { host: string; apiKey: string } => {
  if (connection.key === personalAccessToken.key) {
    const hostField = util.types.toString(connection.fields.host);
    
    const url = new URL(
      hostField.startsWith("http") ? hostField : `https://${hostField}`,
    );
    return {
      host: url.origin,
      apiKey: util.types.toString(connection.fields.apiKey),
    };
  }
  if (connection.key === workspaceServicePrincipal.key) {
    const url = new URL(util.types.toString(connection.fields.tokenUrl));
    return {
      host: url.origin, 
      apiKey: util.types.toString(connection.token?.access_token),
    };
  }
  throw new Error(`Unknown connection type received: ${connection.key}`);
};

export const createDataBricksClient = (
  connection: Connection,
  apiVersion: "1.2" | "2.0",
  debug: boolean,
) => {
  const { host, apiKey } = getHostAndApiKey(connection);
  return createClient({
    baseUrl: `${host}/api/${apiVersion}/`,
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
    debug,
  });
};
