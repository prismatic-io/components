import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import { createClient } from "@prismatic-io/spectral/dist/clients/http";

export const validateConnection = (connection: Connection) => {
  const { apiKey, baseUrl } = connection.fields;
  if (!apiKey) {
    throw new ConnectionError(
      connection,
      "A valid DeepSeek connection is required."
    );
  }

  return {
    apiKey: util.types.toString(apiKey),
    baseUrl: util.types.toString(baseUrl),
  };
};

export function createDeepSeekClient(
  acmeConnection: Connection,
  debug = false
) {
  const { apiKey, baseUrl } = validateConnection(acmeConnection);

  return createClient({
    baseUrl,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    debug,
  });
}
