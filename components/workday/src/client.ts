import type { Connection } from "@prismatic-io/spectral";
import {
  createClient,
  type HttpClient,
} from "@prismatic-io/spectral/dist/clients/http";
import { validateConnection } from "./util";

export const getClient = (
  connection: Connection,
  debug: boolean,
): HttpClient => {
  validateConnection(connection);
  const baseUrl = connection.fields.apiUrl as string;
  return createClient({
    baseUrl,
    debug,
    headers: {
      Authorization: `Bearer ${connection.token?.access_token}`,
      "Content-Type": "application/json",
    },
  });
};
