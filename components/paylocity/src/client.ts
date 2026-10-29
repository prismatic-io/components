import { URLSearchParams } from "node:url";
import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import { createClient as createHttpClient } from "@prismatic-io/spectral/dist/clients/http";
import {
  paylocityOAuth,
  paylocityOAuthV1,
  v1Environment,
  v2Environment,
} from "./connections";

export const validateConnection = (connection: Connection) => {
  if (
    !connection.fields.clientId &&
    !connection.fields.clientSecret &&
    !connection.fields.environment &&
    !connection.fields.tokenUrl &&
    !connection.fields.scopes
  ) {
    throw new ConnectionError(
      connection,
      "Received valid Connection type but did not find valid fields.",
    );
  }
};

export const getHeaders = async (connection: Connection) => {
  let access_token = "";
  if (connection.key === paylocityOAuth.key) {
    access_token = util.types.toString(connection.token.access_token);
  } else if (connection.key === paylocityOAuthV1.key) {
    const { scopes, clientId, clientSecret, tokenUrl } = connection.fields;

    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");
    params.append("scope", util.types.toString(scopes));
    params.append("client_id", util.types.toString(clientId));
    params.append("client_secret", util.types.toString(clientSecret));
    const client = createHttpClient({
      baseUrl: util.types.toString(tokenUrl),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    try {
      const { data } = await client.post("", params);

      access_token = util.types.toString(data.access_token);
    } catch {
      throw new ConnectionError(
        connection,
        "Received valid Connection type but did not find valid fields.",
      );
    }
  } else {
    throw new ConnectionError(
      connection,
      "Received unsupported Connection type.",
    );
  }
  if (!access_token) {
    throw new ConnectionError(
      connection,
      "Received valid Connection type but did not find valid access token.",
    );
  }
  return {
    Authorization: `Bearer ${util.types.toString(access_token)}`,
    "Content-Type": "application/json",
  };
};

export const createClient = async (connection: Connection, debug: boolean) => {
  validateConnection(connection);
  const headers = await getHeaders(connection);
  const { environment } = connection.fields;
  const baseUrl =
    connection.key === paylocityOAuth.key
      ? v2Environment[`${environment}`].value
      : v1Environment[`${environment}`].value;

  const client = createHttpClient({
    baseUrl: util.types.toString(baseUrl),
    headers,
    debug,
  });
  return client;
};

export const validateV1Connection = (connection: Connection) => {
  if (connection.key !== paylocityOAuthV1.key) {
    throw new ConnectionError(
      connection,
      `Connection type is not of type ${paylocityOAuthV1.display.label}`,
    );
  }
};

export const validateV2Connection = (connection: Connection) => {
  if (connection.key !== paylocityOAuth.key) {
    throw new ConnectionError(
      connection,
      `Connection type is not of type ${paylocityOAuth.display.label}`,
    );
  }
};
