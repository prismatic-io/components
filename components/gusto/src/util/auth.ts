import { util, type Connection } from "@prismatic-io/spectral";
import { createClient as createHttpClient } from "@prismatic-io/spectral/http";

export const fetchToken = async (
  connection: Connection,
  debug: boolean,
): Promise<string> => {
  const { clientId, clientSecret, tokenUrl } = connection.fields;

  const client = createHttpClient({
    baseUrl: util.types.toString(tokenUrl),
    headers: {
      "Content-Type": "application/json",
    },
    debug,
  });

  const { data } = await client.post("", {
    grant_type: "system_access",
    client_id: util.types.toString(clientId),
    client_secret: util.types.toString(clientSecret),
  });

  return data.access_token;
};
