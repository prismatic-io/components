import type { ActionLogger, Connection } from "@prismatic-io/spectral";
import { GraphQLClient } from "graphql-request";
import { getCredentials, validateConnection } from "./util";

const redactHeaders = (headers: unknown): Record<string, string> =>
  Object.fromEntries(
    Object.keys(headers ?? {}).map((name) => [name, "[REDACTED]"]),
  );

export const createDuroClient = (
  connection: Connection,
  debug = false,
  logger?: ActionLogger,
): GraphQLClient => {
  validateConnection(connection);
  const { apiKey, url } = getCredentials(connection);
  return new GraphQLClient(url, {
    headers: { apiToken: apiKey },
    ...(debug && logger
      ? {
          requestMiddleware: (request) => {
            logger.debug(
              `Duro GraphQL request: ${JSON.stringify({
                ...request,
                headers: redactHeaders(request.headers),
              })}`,
            );
            return request;
          },
          responseMiddleware: (response) => {
            logger.debug(`Duro GraphQL response: ${JSON.stringify(response)}`);
          },
        }
      : {}),
  });
};
