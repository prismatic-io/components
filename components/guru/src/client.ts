import { type Connection, util } from "@prismatic-io/spectral";
import {
  createClient,
  type HttpClient,
} from "@prismatic-io/spectral/dist/clients/http";

import { BASE_URL } from "./constants";
import { validateConnection } from "./util";

export const getAuthorizationHeaderValue = (connection: Connection): string => {
  const username = util.types.toString(connection.fields.username);
  const password = util.types.toString(connection.fields.userToken);
  return `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`;
};

export const getGuruClient = (
  connection: Connection,
  debug: boolean,
): HttpClient => {
  validateConnection(connection);

  return createClient({
    baseUrl: BASE_URL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: getAuthorizationHeaderValue(connection),
    },
    debug,
  });
};
