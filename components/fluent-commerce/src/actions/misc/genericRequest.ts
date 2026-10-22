import { action } from "@prismatic-io/spectral";
import merge from "lodash.merge";
import { createFluentClient } from "../../client";
import { genericRequestExamplePayload } from "../../examplePayloads";
import { genericRequestInputs } from "../../inputs";
export const genericRequest = action({
  display: {
    label: "Generic GraphQL Request",
    description: "Issue any GraphQL query or mutation with variables",
  },
  inputs: genericRequestInputs,
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = await createFluentClient(
      params.connection,
      context.debug.enabled,
      context.logger,
    );
    const data = await client.request(
      params.query,
      merge(params.variables, params.variablesObject),
    );
    return { data };
  },
  examplePayload: genericRequestExamplePayload,
});
