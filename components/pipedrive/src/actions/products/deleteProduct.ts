import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteProductInputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
import { deleteProductExamplePayload } from "../../examplePayloads";
import { deleteProductOutputSchema } from "../../outputSchemas";

export const deleteProduct = action({
  display: {
    label: "Delete Product",
    description: "Deletes a product.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, id }) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      WebhookVersion.V2,
    );
    const { data } = await client.delete(`/products/${id}`);
    return { data };
  },
  inputs: deleteProductInputs,
  examplePayload: deleteProductExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteProductOutputSchema,
  }),
});
