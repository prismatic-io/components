import { type Connection, util } from "@prismatic-io/spectral";
import { GraphQLClient } from "graphql-request";
import urlJoin from "url-join";
import { createClient } from "@prismatic-io/spectral/dist/clients/http";

export const createFluentClient = async (
  connection: Connection,
  debug: boolean,
): Promise<GraphQLClient> => {
  const { clientId, clientSecret, host, password, username } =
    connection.fields;

  
  let access_token: string;
  const axiosClient = createClient({ debug });
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

  
  const graphqlUrl = urlJoin(util.types.toString(host), "graphql");
  const client = new GraphQLClient(graphqlUrl, {
    headers: { authorization: `bearer ${access_token}` },
  });
  return client;
};
