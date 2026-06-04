import { type Connection, util } from "@prismatic-io/spectral";
import {
  createClient as createHttpClient,
  type HttpClient,
} from "@prismatic-io/spectral/dist/clients/http";

export const createClient = (
  connection: Connection,
  debug: boolean,
  timeout = 10000,
): HttpClient => {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${connection.fields.apiKey}`,
  };

  const organization = util.types.toString(connection.fields.organization);
  if (organization) {
    headers["OpenAI-Organization"] = organization;
  }

  return createHttpClient({
    baseUrl: "https://api.openai.com",
    headers,
    responseType: "json",
    timeout,
    debug,
  });
};
