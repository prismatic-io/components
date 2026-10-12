import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteProductFieldInputs } from "../../inputs";
import { deleteProductFieldExamplePayload } from "../../examplePayloads";
import { deleteProductFieldOutputSchema } from "../../outputSchemas";
export const deleteProductField = action({
  display: {
    label: "Delete Product Field",
    description: "Deletes a product field.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.delete(`/productFields/${id}`);
    return { data };
  },
  inputs: deleteProductFieldInputs,
  examplePayload: deleteProductFieldExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteProductFieldOutputSchema,
  }),
});
