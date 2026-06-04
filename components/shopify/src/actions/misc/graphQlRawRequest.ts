import { action } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../client";
import { graphQlRawRequestInputs as inputs } from "../../inputs";

export const graphQlRawRequest = action({
  display: {
    label: "Raw Request",
    description: "Sends a raw GraphQL request to Shopify.",
  },
  inputs,
  perform: async (context, { connection, apiVersion, query, variables, variablesObject }) => {
    const client = getShopifyGraphQlClient(connection, apiVersion, context.debug.enabled);
    const data = await client.request(query, {
      ...variables,
      ...variablesObject,
    });
    return { data };
  },
});
