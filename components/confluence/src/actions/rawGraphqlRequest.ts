import { action } from "@prismatic-io/spectral";
import {
  connectionInput,
  headersInput,
  queryInput,
  variablesInput,
} from "../inputs";
import { createGraphClient } from "../client";

const graphqlRequest = action({
  display: {
    label: "Raw GraphQL Request",
    description: "Send raw GraphQL request to Confluence",
  },
  inputs: {
    connection: connectionInput,
    query: queryInput,
    variables: variablesInput,
    headers: headersInput,
  },
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

export default graphqlRequest;
