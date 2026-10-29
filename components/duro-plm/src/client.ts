import type { Connection } from "@prismatic-io/spectral";
import { GraphQLClient } from "graphql-request";
import { getCredentials, validateConnection } from "./util";

export const createDuroClient = (connection: Connection, debug: boolean) => {
  validateConnection(connection);
  const { apiKey, url } = getCredentials(connection);
  return new GraphQLClient(url, {
    headers: { apiToken: apiKey },
    requestMiddleware: (request) => {
      if (debug) console.log(JSON.stringify(request));
      return request;
    },
    responseMiddleware: (response) => {
      if (debug) console.log(JSON.stringify(response));
      return response;
    },
  });
};
