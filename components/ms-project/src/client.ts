import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import { createClient, type HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { URL } from "url";
import { oauth } from "./connections";
import type { CreateClientProps } from "./types";

Array.isArray([]);

export const validateConnection = (connection: Connection): connection is Connection => {
  if (connection.key !== oauth.key) {
    throw new ConnectionError(connection, `Unknown Connection type provided: ${connection.key}`);
  }

  if (!connection.token?.access_token) {
    throw new ConnectionError(connection, "Received a Connection without a valid access token.");
  }
  return true;
};

export const createProjectsClient = (
  { connection }: CreateClientProps,
  debug: boolean,
): HttpClient => {
  validateConnection(connection);

  const url = new URL(
    "/sites/pwa/_api/ProjectServer",
    util.types.toString(connection.fields.pwaSite),
  );

  const projectsClient = createClient({
    baseUrl: url.toString(),
    headers: {
      Authorization: `Bearer ${connection.token?.access_token}`,
      Accept: "application/json;odata=verbose",
    },
    responseType: "json",
    debug,
  });

  return projectsClient;
};
