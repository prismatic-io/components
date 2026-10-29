import { type Connection, ConnectionError } from "@prismatic-io/spectral";
import {
  createClient,
  type HttpClient,
} from "@prismatic-io/spectral/dist/clients/http";
import { validateConnection } from "./utils";
import { buildAuthHeader } from "./utils/auth";
import type { CosmosDbResourceType, HttpVerb } from "./constants";

export interface CosmosDbConnection extends Connection {
  fields: {
    cosmosEndpoint: string;
    masterKey: string;
  };
}

export const createCosmosDbClient = ({
  connection,
  verb,
  resourceType,
  resourceLink,
  debug,
}: {
  connection: Connection;
  verb: HttpVerb;
  resourceType: CosmosDbResourceType;
  resourceLink: string;
  debug: boolean;
}): HttpClient => {
  const cosmosConnection = connection as CosmosDbConnection;
  validateConnection(cosmosConnection);

  if (!cosmosConnection.fields?.cosmosEndpoint) {
    throw new ConnectionError(
      connection,
      "Cosmos DB endpoint is required but was not provided",
    );
  }

  if (!cosmosConnection.fields?.masterKey) {
    throw new ConnectionError(
      connection,
      "Cosmos DB master key is required but was not provided",
    );
  }

  const baseUrl = cosmosConnection.fields.cosmosEndpoint.replace(/\/$/, "");
  const masterKey = cosmosConnection.fields.masterKey;
  const date = new Date().toUTCString();
  const authHeader = buildAuthHeader(
    verb,
    resourceType,
    resourceLink,
    date,
    masterKey,
  );

  return createClient({
    baseUrl,
    headers: {
      "x-ms-version": "2018-12-31",
      "x-ms-date": date,
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: authHeader,
    },
    debug,
  });
};
