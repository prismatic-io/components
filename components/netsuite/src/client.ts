import { URL, URLSearchParams } from "node:url";
import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import {
  createClient as createHttpClient,
  type HttpClient,
} from "@prismatic-io/spectral/dist/clients/http";
import { oauth, oauthClientCredentials } from "./connections";
import { ACCOUNT_REGEX } from "./constants";
import { createDynamicJWTToken } from "./utils";

export const baseUrl = (
  connection: Connection,
  restAPIServiceType: string,
): string => {
  const tokenUrl = util.types.toString(connection.fields.tokenUrl);
  const accountMatch = ACCOUNT_REGEX.exec(tokenUrl);
  if (accountMatch?.[1]) {
    const accountId = accountMatch[1];
    return `https://${accountId}.suitetalk.api.netsuite.com/services/rest/${restAPIServiceType}/v1`;
  }
  throw new Error("Unable to extract account ID from the Token URL.");
};

export const authorizationHeaders = async (connection: Connection) => {
  if (oauthClientCredentials.key === connection.key) {
    const token = createDynamicJWTToken(connection);
    const tokenUrl = util.types.toString(connection.fields.tokenUrl);
    const baseUrl = new URL(tokenUrl).origin;
    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");
    params.append(
      "client_assertion_type",
      "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
    );
    params.append("client_assertion", token);
    const client = createHttpClient({
      baseUrl,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    });
    const {
      data: { access_token },
    } = await client.post("/services/rest/auth/oauth2/v1/token", params);

    return { Authorization: `Bearer ${util.types.toString(access_token)}` };
  }
  const token = util.types.toString(connection.token?.access_token);
  if (!token) {
    throw new Error("Did not receive an access token to use.");
  }
  return { Authorization: `Bearer ${token}` };
};

export const createClient = async (
  connection: Connection,
  restAPIServiceType: string,
  debug?: boolean,
): Promise<HttpClient> => {
  if (
    oauth.key !== connection.key &&
    oauthClientCredentials.key !== connection.key
  ) {
    throw new ConnectionError(
      connection,
      `Received unexpected connection type: ${connection.key}`,
    );
  }
  const defaultHeaders = {
    ...(await authorizationHeaders(connection)),
    "X-NetSuite-PropertyNameValidation": "Warning",
    "X-NetSuite-PropertyValueValidation": "Warning",
  };

  return createHttpClient({
    baseUrl: baseUrl(connection, restAPIServiceType),
    headers:
      restAPIServiceType === "query"
        ? { ...defaultHeaders, Prefer: "transient" }
        : { ...defaultHeaders },
    responseType: "json",
    debug,
  });
};
