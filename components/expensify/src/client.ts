import { type Connection, ConnectionError } from "@prismatic-io/spectral";
import {
  createClient as createHttpClient,
  type HttpClient,
} from "@prismatic-io/spectral/dist/clients/http";
import { basicConnection } from "./connections";
import { BASE_URL, SUCCESS_RESPONSE_CODE } from "./constants";
import type { JobResponseEnvelope } from "./types";

export const validateConnection = (connection: Connection): void => {
  if (connection.key !== basicConnection.key) {
    throw new ConnectionError(
      connection,
      `The Connection you provided (${connection.key}) is not supported for this component`,
    );
  }
  if (
    !connection.fields.partnerUserID ||
    !connection.fields.partnerUserSecret
  ) {
    throw new ConnectionError(
      connection,
      `The Connection you provided is missing the required fields`,
    );
  }
};

export const assertJobSucceeded = <T extends { data?: unknown }>(
  response: T,
): T => {
  const body = response.data as JobResponseEnvelope;
  if (
    body &&
    typeof body === "object" &&
    typeof body.responseCode === "number" &&
    body.responseCode !== SUCCESS_RESPONSE_CODE
  ) {
    const message = body.responseMessage ? `: ${body.responseMessage}` : "";
    throw new Error(
      `Expensify request failed with responseCode ${body.responseCode}${message}`,
    );
  }
  return response;
};

export const createClient = (
  connection: Connection,
  debug = false,
): HttpClient => {
  validateConnection(connection);
  const client = createHttpClient({
    baseUrl: BASE_URL,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    debug,
  });
  client.interceptors.response.use(assertJobSucceeded);
  return client;
};
