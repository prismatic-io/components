import { action } from "@prismatic-io/spectral";
import { createClient } from "@prismatic-io/spectral/dist/clients/http";
import { getConfig } from "../../client";
import { graphQLRawRequestInputs } from "../../inputs";
export const graphQLRawRequest = action({
  display: {
    label: "Raw Request (GraphQL)",
    description: "Send a raw GraphQL request to Adobe Commerce.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, store, query }) => {
    const { authorize } = await getConfig(connection, context.debug.enabled);
    const baseUrl = `https://${store}`;
    const client = createClient({
      baseUrl,
      headers: { "Content-Type": "application/json" },
      debug: context.debug.enabled,
    });
    const { data } = await client.post("/graphql", query, {
      headers: {
        Authorization: authorize({
          method: "POST",
          url: `${baseUrl}/graphql`,
          params: [],
        }),
      },
    });
    return { data };
  },
  inputs: graphQLRawRequestInputs,
});
