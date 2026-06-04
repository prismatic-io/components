import { action } from "@prismatic-io/spectral";
import merge from "lodash.merge";
import { getMondayClient } from "../../client";
import { genericRequestInputs } from "../../inputs";

export const genericRequest = action({
  display: {
    label: "Generic GraphQL Request",
    description: "Issues any GraphQL query or mutation with variables.",
  },
  inputs: genericRequestInputs,
  perform: async (context, params) => {
    const client = getMondayClient(params.connection, context.debug.enabled);
    const data = await client.request(
      params.query,
      merge(params.variables, params.variablesObject),
    );
    return { data };
  },
});
