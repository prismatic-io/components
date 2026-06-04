import { action } from "@prismatic-io/spectral";
import { createGraphQLClient } from "../../client";
import { rawRequestExamplePayload } from "../../examplePayloads";
import { rawRequestInputs } from "../../inputs/general";

export const rawRequest = action({
  display: {
    label: "Run GraphQL Query",
    description: "Performs a generic GraphQL query against the API.",
  },
  examplePayload: rawRequestExamplePayload,
  perform: async (context, { connection, query, variables }) => {
    const client = createGraphQLClient(connection, context.debug.enabled);
    const data = await client.request(
      query,
      (variables ?? {}) as Record<string, unknown>,
    );
    return {
      data,
    };
  },
  inputs: rawRequestInputs,
});
