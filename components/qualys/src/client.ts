import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import {
  createClient as createHttpClient,
  type HttpClient,
} from "@prismatic-io/spectral/dist/clients/http";
import type { HttpErrorResponse } from "./types";
import { validateConnection } from "./util";
const fetchGatewayToken = async (
  gatewayUrl: string,
  username: string,
  password: string,
): Promise<string> => {
  const authClient = createHttpClient({ baseUrl: gatewayUrl });
  const response = await authClient.post<string>(
    "/auth",
    new URLSearchParams({ username, password }),
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } },
  );
  return typeof response.data === "string" ? response.data : "";
};
const getConnectionFields = (
  connection: Connection,
): {
  username: string;
  password: string;
  gatewayUrl: string;
  classicUrl: string;
} => ({
  username: util.types.toString(connection.fields.username),
  password: util.types.toString(connection.fields.password),
  gatewayUrl: util.types
    .toString(connection.fields.gatewayUrl)
    .replace(/\/$/, ""),
  classicUrl: util.types
    .toString(connection.fields.classicUrl)
    .replace(/\/$/, ""),
});
export const createGatewayClient = async (
  connection: Connection,
  debug = false,
): Promise<HttpClient> => {
  validateConnection(connection);
  const { gatewayUrl, username, password } = getConnectionFields(connection);
  const jwt = await fetchGatewayToken(gatewayUrl, username, password);
  return createHttpClient({
    baseUrl: gatewayUrl,
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    debug,
  });
};
export const createClassicClient = (
  connection: Connection,
  debug = false,
): HttpClient => {
  validateConnection(connection);
  const { classicUrl, username, password } = getConnectionFields(connection);
  const credentials = Buffer.from(`${username}:${password}`).toString("base64");
  return createHttpClient({
    baseUrl: classicUrl,
    headers: {
      Authorization: `Basic ${credentials}`,
      "X-Requested-With": "Integration",
    },
    debug,
  });
};
export { createClassicClient as createTicketClient };
export const gatewayRequest = async <T>(
  connection: Connection,
  debug = false,
  requestFn: (client: HttpClient) => Promise<T>,
): Promise<T> => {
  try {
    const client = await createGatewayClient(connection, debug);
    return await requestFn(client);
  } catch (error: unknown) {
    const httpError = error as HttpErrorResponse;
    const status = httpError.response?.status;
    if (status === 429) {
      const retryAfter = httpError.response?.headers?.["retry-after"];
      throw new ConnectionError(
        connection,
        `Rate limited by Qualys.${retryAfter ? ` Retry after ${retryAfter} seconds.` : ""}`,
      );
    }
    throw error;
  }
};
