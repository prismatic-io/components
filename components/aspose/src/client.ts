import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import {
  createClient,
  type HttpClient,
} from "@prismatic-io/spectral/dist/clients/http";
import { asposeConnection } from "./connections";
import type {
  AsposeClientProps,
  AsposeTokenProps,
  TokenResponse,
} from "./types";

const getClientProps = (connection: Connection): AsposeClientProps => {
  const { clientId, clientSecret, baseUrl } = connection.fields;

  return {
    clientId: util.types.toString(clientId),
    clientSecret: util.types.toString(clientSecret),
    baseUrl: util.types.toString(baseUrl),
  };
};

const getAsposeToken = async (
  clientId: string,
  clientSecret: string,
  baseUrl: string,
): Promise<AsposeTokenProps> => {
  const tokenClient = createClient({
    baseUrl,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const { data } = await tokenClient.post<TokenResponse>("/connect/token", {
    grant_type: "client_credentials",
    client_id: clientId,
    client_secret: clientSecret,
  });

  return { token: data.access_token };
};

export const getAsposeClient = async (
  connection: Connection,
  debugRequest?: boolean,
  apiVersion = "v4.0",
): Promise<HttpClient> => {
  if (connection.key !== asposeConnection.key) {
    throw new ConnectionError(connection, "Aspose connection not found");
  }

  const { clientId, clientSecret, baseUrl } = getClientProps(connection);
  const { token } = await getAsposeToken(clientId, clientSecret, baseUrl);

  return createClient({
    debug: debugRequest,
    baseUrl: `${baseUrl}/${apiVersion}`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};
