import { action } from "@prismatic-io/spectral";
import { graphqlRequestInputs } from "../../inputs";
import { createGraphClient } from "../../client";
export const graphqlRequest = action({
  display: {
    label: "Raw GraphQL Request",
    description: "Send raw GraphQL request to Confluence.",
  },
  inputs: graphqlRequestInputs,
  performSafety: "notAllowed",
  perform: async (context, { connection, headers, query, variables }) => {
    const client = createGraphClient(connection, context.debug.enabled);
    const { data } = await client.rawRequest(
      query,
      variables,
      headers as Record<string, string>,
    );
    return { data };
  },
});
