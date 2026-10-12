import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getProductFieldsInputs } from "../../inputs";
import { getProductFieldsExamplePayload } from "../../examplePayloads";
import { getProductFieldsOutputSchema } from "../../outputSchemas";
export const getProductFields = action({
  display: {
    label: "Get Product Fields",
    description: "Gets all product fields.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, pagination: { start, limit } = {} },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get("/productFields", {
      params: { start, limit },
    });
    return { data };
  },
  inputs: getProductFieldsInputs,
  examplePayload: getProductFieldsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getProductFieldsOutputSchema,
  }),
});
