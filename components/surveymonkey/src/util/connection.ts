import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import type { RegionKey } from "../types";
import { REGIONS } from "../constants";
import connections from "../connections";

export const validateConnection = (connection: Connection): void => {
  const connectionKeys = connections.map((c) => c.key);

  if (!connectionKeys.includes(connection.key)) {
    throw new ConnectionError(
      connection,
      `Unsupported connection ${connection.key}.`,
    );
  }
};

export const getBaseUrl = (connection: Connection): string => {
  const region = util.types.toString(
    connection.fields?.region ?? connection.token?.region ?? "us",
  );

  return REGIONS[region as RegionKey].baseUrl;
};

export const getAccessToken = (connection: Connection): string => {
  if (connection.token?.access_token) {
    return util.types.toString(connection.token.access_token);
  }

  if (connection.fields?.accessToken) {
    return util.types.toString(connection.fields.accessToken);
  }

  throw new Error(
    "No access token found. Please check your connection configuration.",
  );
};
