import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { addProductInputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
import { addProductExamplePayload } from "../../examplePayloads";
import { addProductOutputSchema } from "../../outputSchemas";
export const addProduct = action({
  display: {
    label: "Add Product",
    description: "Adds a product.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, name, code, unit, tax, visibleTo, ownerId, prices },
  ) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      WebhookVersion.V2,
    );
    const { data } = await client.post("/products", {
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
  inputs: addProductInputs,
  examplePayload: addProductExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: addProductOutputSchema,
  }),
});
