import { createClient } from "@prismatic-io/spectral/dist/clients/http";
import type { Connection } from "@prismatic-io/spectral";
import { getCredentialsFromConnection, validateConnection } from "./utils";
import { BASE_URL } from "./constants";

export const createKarbonClient = (connection: Connection, debug: boolean) => {
  validateConnection(connection);
  const { applicationId, accessKey } = getCredentialsFromConnection(connection);

  return createClient({
    baseUrl: BASE_URL,
    headers: {
      AccessKey: accessKey,
      Authorization: `Bearer ${applicationId}`,
    },
    debug,
  });
};
