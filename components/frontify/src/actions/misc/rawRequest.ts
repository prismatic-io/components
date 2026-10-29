import { action } from "@prismatic-io/spectral";
import type { RequestDocument } from "graphql-request";
import { createClient } from "../../client";
import { rawRequestInputs as inputs } from "../../inputs/misc";

export const rawRequest = action({
  display: {
    label: "Raw GraphQL Request",
    description: "Send a raw GraphQL request to Frontify.",
  },
  perform: async (context, { connection, query, variableMap }) => {
    const response = await createClient({
      connection,
      debug: context.debug.enabled,
    }).request(query as RequestDocument, variableMap);

    return {
      data: response,
    };
  },
  inputs,
});
