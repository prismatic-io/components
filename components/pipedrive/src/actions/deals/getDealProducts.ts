import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getDealProductsInputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
import { getDealProductsExamplePayload } from "../../examplePayloads";
import { getDealProductsOutputSchema } from "../../outputSchemas";
export const getDealProducts = action({
  display: {
    label: "Get Deal Products",
    description: "Lists products attached to a deal.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      id,
      pagination: { limit, cursor } = {},
      sortBy,
      sortDirection,
    },
  ) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      WebhookVersion.V2,
    );
    const { data } = await client.get(`/deals/${id}/products`, {
      params: { limit, sort_by: sortBy, sort_direction: sortDirection, cursor },
    });
    return { data };
  },
  inputs: getDealProductsInputs,
  examplePayload: getDealProductsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getDealProductsOutputSchema,
  }),
});
