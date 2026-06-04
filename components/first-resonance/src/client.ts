import type { Connection } from "@prismatic-io/spectral";
import { GraphQLClient } from "graphql-request";
import { getApiUrl, validConnection } from "./util";

export const createGraphQLClient = (connection: Connection, debug: boolean) => {
  validConnection(connection);
  const apiUrl = getApiUrl(connection);
  return new GraphQLClient(apiUrl, {
    headers: {
      Authorization: `Bearer ${connection.token?.access_token}`,
      
      "Content-type": "application/json",
    },
    requestMiddleware: (request) => {
      if (debug) console.log(JSON.stringify(request));
      return request;
    },
    responseMiddleware: (response) => {
      if (debug && !(response instanceof Error) && response.errors) {
        const traceId = response.headers.get("x-b3-trace-id") || "unknown";
        console.error(
          `[${traceId}] Request error:
          status ${String(response.status)}
          details: ${response.errors.map((_) => _.message).join(", ")}`,
        );
      }
    },
  });
};
