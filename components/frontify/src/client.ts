import type { Connection } from "@prismatic-io/spectral";
import { GraphQLClient } from "graphql-request";
import { cleanUrl } from "./utils/cleanUrl";
import { validateConnection } from "./utils/validateConnections";

export const createClient = ({
  connection,
  debug = false,
}: {
  connection: Connection;
  debug: boolean;
}) => {
  try {
    validateConnection(connection);

    const url = cleanUrl(connection.fields.baseUrl);
    const client = new GraphQLClient(`${url}/graphql`, {
      headers: {
        Authorization: `Bearer ${connection.token?.access_token || connection.fields.personalDeveloperToken}`,
        "Content-Type": "application/json",
      },
      requestMiddleware: (request) => {
        if (debug) {
          console.log(request);
        }
        return request;
      },
      responseMiddleware: (response) => {
        if (debug) {
          console.log(response);
        }
      },
    });

    return client;
  } catch (error) {
    console.log(error);
  }
};
