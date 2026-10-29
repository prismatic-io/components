import type { Connection } from "@prismatic-io/spectral";
import { createClient } from "@prismatic-io/spectral/dist/clients/http";

export const createAirtableClient = (
  airtableConnection: Connection,
  debug = false,
) => {
  const apiKey =
    airtableConnection.token?.access_token || airtableConnection.fields.apiKey;
  return createClient({
    baseUrl: "https://api.airtable.com",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    debug,
  });
};
