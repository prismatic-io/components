import { action, util } from "@prismatic-io/spectral";
import { createClient, handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getConfig } from "../client";
import { connectionInput, query, store } from "../inputs";

export const graphQLRawRequest = action({
  display: {
    label: "GraphQL Raw Request",
    description: "Send raw GraphQL request to Adobe Commerce",
  },
  perform: async (context, { connection, store, query }) => {
    
    const { token } = await getConfig(connection, context.debug.enabled);
    const client = createClient({
      baseUrl: `https://${store}`,
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      debug: context.debug.enabled,
    });
    try {
      const { data } = await client.post("/graphql", query);
      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  inputs: {
    connection: connectionInput,
    store,
    query,
  },
});

export default { graphQLRawRequest };
