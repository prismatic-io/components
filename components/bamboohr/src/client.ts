import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import { createClient, type HttpClient } from "@prismatic-io/spectral/http";
import { apiKey } from "./connections";
import {
  ERROR_MESSAGE_HEADER,
  GATEWAY_URL,
  MAX_RETRIES,
  RETRYABLE_STATUS_CODES,
  SAFE_RETRY_METHODS,
} from "./constants";

const retryConfig = {
  retries: MAX_RETRIES,
  useExponentialBackoff: true,
  retryCondition: (error: {
    code?: string;
    response?: { status?: number };
    config?: { method?: string };
  }): boolean => {
    if (error.response !== undefined) {
      return RETRYABLE_STATUS_CODES.includes(
        util.types.toNumber(error.response.status),
      );
    }
    return (
      util.types.toString(error.code) !== "" &&
      SAFE_RETRY_METHODS.includes(
        util.types.toString(error.config?.method).toLowerCase(),
      )
    );
  },
};

const addErrorDetail = (client: HttpClient): void => {
  client.interceptors.response.use(
    undefined,
    (error: {
      response?: { headers?: Record<string, unknown> };
      message: string;
    }) => {
      const detail = util.types.toString(
        error.response?.headers?.[ERROR_MESSAGE_HEADER],
      );
      if (detail !== "" && !error.message.endsWith(`: ${detail}`)) {
        error.message = `${error.message}: ${detail}`;
      }
      return Promise.reject(error);
    },
  );
};

export const createBambooClient = (
  connection: Connection,
  debug = false,
): HttpClient => {
  if (connection.key !== apiKey.key) {
    throw new ConnectionError(
      connection,
      `Unknown Connection type provided: ${connection.key}`,
    );
  }

  const key = util.types.toString(connection.fields.apiKey);
  const companyDomain = util.types.toString(connection.fields.companyDomain);
  const token = Buffer.from(`${key}:x`).toString("base64");

  const client = createClient({
    baseUrl: `${GATEWAY_URL}/${companyDomain}/`,
    responseType: "json",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: `Basic ${token}`,
    },
    debug,
    retryConfig,
  });
  addErrorDetail(client);
  return client;
};
