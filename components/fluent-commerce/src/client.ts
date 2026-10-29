import {
  type ActionLogger,
  type Connection,
  ConnectionError,
  util,
} from "@prismatic-io/spectral";
import { createClient } from "@prismatic-io/spectral/dist/clients/http";
import { GraphQLClient } from "graphql-request";
import urlJoin from "url-join";
import { fluentCommerceOAuthPassword } from "./connections";

export const createFluentClient = async (
  connection: Connection,
  debug = false,
  logger?: ActionLogger,
): Promise<GraphQLClient> => {
  if (connection.key !== fluentCommerceOAuthPassword.key) {
    throw new ConnectionError(
      connection,
      `Received unexpected connection type: ${connection.key}`,
    );
  }

  const { clientId, clientSecret, host, password, username } =
    connection.fields;

  let access_token: string | undefined;
  const axiosClient = createClient({ debug: false });
  try {
    const oauthUrl = urlJoin(util.types.toString(host), "oauth/token");
    const { data: authResponseData } = await axiosClient.post(oauthUrl, null, {
      params: {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "password",
        scope: "api",
        password,
        username,
      },
    });
    access_token = authResponseData.access_token;
  } catch (error) {
    throw new Error(
      `An error occurred during authentication. Please ensure your username, password, client ID, client secret and endpoint URL are correct. Error: ${error}`,
    );
  }

  if (!access_token) {
    throw new Error(
      "Fluent returned no access token. Please ensure your username, password, client ID, client secret and endpoint URL are correct.",
    );
  }

  const graphqlUrl = urlJoin(util.types.toString(host), "graphql");
  const client = new GraphQLClient(graphqlUrl, {
    headers: { authorization: `bearer ${access_token}` },
    ...(debug && logger
      ? {
          requestMiddleware: (request) => {
            logger.debug(`Fluent GraphQL request: ${request.body}`);
            return request;
          },
        }
      : {}),
  });
  return client;
};
