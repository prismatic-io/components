import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { addDealProductInputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
import { addDealProductExamplePayload } from "../../examplePayloads";
import { addDealProductOutputSchema } from "../../outputSchemas";
export const addDealProduct = action({
  display: {
    label: "Add Deal Product",
    description:
      "Adds a product to the deal, eventually creating a new item called a deal-product.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      id,
      itemPrice,
      quantity,
      discount,
      discountType,
      productVariationId,
      comments,
      tax,
      isEnabled,
      productId,
    },
  ) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      WebhookVersion.V2,
    );
    const { data } = await client.post(`/deals/${id}/products`, {
      item_price: itemPrice,
      quantity,
      discount,
      discount_type: discountType,
      product_variation_id: productVariationId,
      comments,
      tax,
      isEnabled: isEnabled,
      product_id: productId,
    });
    return { data };
  },
  inputs: addDealProductInputs,
  examplePayload: addDealProductExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: addDealProductOutputSchema,
  }),
});
