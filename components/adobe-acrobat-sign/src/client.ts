import {
  createClient,
  type HttpClient,
} from "@prismatic-io/spectral/dist/clients/http";
import { type Connection, util } from "@prismatic-io/spectral";
import type { ResponseType } from "axios";

export const getClientProps = (connection: Connection) => {
  if (!connection.token?.access_token) {
    throw new Error(
      "Received valid Connection but it did not contain an access token.",
    );
  }

  const token = `Bearer ${util.types.toString(connection.token.access_token)}`;
  const baseUrl = util.types.toString(connection.token.api_access_point);

  return { token, baseUrl };
};

export const getAdobeSignClient = (
  connection: Connection,
  debug?: boolean,
  responseType?: string,
): HttpClient => {
  const { token, baseUrl } = getClientProps(connection);
  return createClient({
    debug,
    responseType: (responseType as ResponseType) || undefined,
    baseUrl: `${baseUrl}api/rest/v6`,
    headers: {
      Authorization: token,
      "Content-Type": "Application/JSON",
    },
    retryConfig: {
      retries: 3,
      useExponentialBackoff: true,
      retryCondition: (error) => error.response?.status === 429,
    },
  });
};
