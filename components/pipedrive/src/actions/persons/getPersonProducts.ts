import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getPersonProductsInputs } from "../../inputs";
import { getPersonProductsExamplePayload } from "../../examplePayloads";
import { getPersonProductsOutputSchema } from "../../outputSchemas";

export const getPersonProducts = action({
  display: {
    label: "Get Person Products",
    description: "Lists products associated with a person.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, id, pagination: { start, limit } = {} },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/persons/${id}/products`, {
      params: { start, limit },
    });
    return { data };
  },
  inputs: getPersonProductsInputs,
  examplePayload: getPersonProductsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getPersonProductsOutputSchema,
  }),
});
