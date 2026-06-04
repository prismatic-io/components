import { type Connection, util } from "@prismatic-io/spectral";
import connections from "./connections";
import { AUTH_SERVERS } from "./constants";

export const validConnection = (connection: Connection): boolean => {
  if (!connections.map((c) => c.key).includes(connection.key)) {
    throw new Error(
      `The connection ${connection.key} is not supported. Please select a valid connection.`,
    );
  }
  return true;
};

export const getApiUrl = (connection: Connection): string => {
  const { authEndpoint: selectedAuthEndpoint } = connection.fields;
  const selectedEndpoint = AUTH_SERVERS.find((authServer) =>
    authServer.authEndpoint.includes(util.types.toString(selectedAuthEndpoint)),
  );
  if (!selectedEndpoint) {
    throw new Error(
      `The Auth Endpoint ${util.types.toString(selectedAuthEndpoint)} is not supported. Please select a valid Auth Endpoint.`,
    );
  }
  return selectedEndpoint.apiUrl;
};
