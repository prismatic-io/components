import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateProductInputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
import { updateProductExamplePayload } from "../../examplePayloads";
import { updateProductOutputSchema } from "../../outputSchemas";

export const updateProduct = action({
  display: {
    label: "Update Product",
    description: "Updates a product.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, id, name, code, unit, tax, visibleTo, ownerId, prices },
  ) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      WebhookVersion.V2,
    );
    const { data } = await client.patch(`/products/${id}`, {
      name,
      code,
      unit,
      tax,
      visible_to: visibleTo,
      owner_id: ownerId,
      prices,
    });
    return { data };
  },
  inputs: updateProductInputs,
  examplePayload: updateProductExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateProductOutputSchema,
  }),
});
