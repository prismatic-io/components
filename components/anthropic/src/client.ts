import { type Connection, util } from "@prismatic-io/spectral";
import {
  createClient,
  type HttpClient,
} from "@prismatic-io/spectral/dist/clients/http";
import { ANTHROPIC_VERSION, BASE_URL } from "./constants";
import { validateConnection } from "./utils";







export const createAnthropicClient = (
  connection: Connection,
  debug: boolean,
): HttpClient => {
  validateConnection(connection);

  const apiKey = util.types.toString(connection.fields.apiKey);

  return createClient({
    baseUrl: BASE_URL,
    debug,
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": ANTHROPIC_VERSION,
      "content-type": "application/json",
    },
    responseType: "json",
  });
};
