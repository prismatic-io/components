import { type Connection, util } from "@prismatic-io/spectral";
import { createClient as createHttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { validAzureOAuthConnection } from "./util";
import { API_URL } from "./constants";

export const createEventGridHttpClient = (
  connection: Connection,
  debug = true,
  apiVersion = "2022-06-15",
) => {
  validAzureOAuthConnection(connection);
  const token = util.types.toString(connection.token?.access_token);

  return createHttpClient({
    baseUrl: API_URL,
    debug,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      "api-version": apiVersion,
    },
  });
};

export const createEventGridPublishClient = (
  connection: Connection,
  baseUrl: string,
  accessKey: string,
  debug = true,
) => {
  validAzureOAuthConnection(connection);

  return createHttpClient({
    baseUrl,
    debug,
    params: {
      "api-version": "2018-01-01",
    },
    headers: {
      "aeg-sas-key": accessKey,
    },
  });
};
