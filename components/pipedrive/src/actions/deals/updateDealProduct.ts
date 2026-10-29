import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateDealProductInputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
import { updateDealProductExamplePayload } from "../../examplePayloads";
import { updateDealProductOutputSchema } from "../../outputSchemas";

export const updateDealProduct = action({
  display: {
    label: "Update Deal Product",
    description:
      "Updates product attachment details of the deal-product (a product already attached to a deal).",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      id,
      productAttachmentId,
      productVariationId,
      additionalFields: {
        itemPrice,
        quantity,
        discount,
        discountType,
        comments,
        tax,
      } = {},
    },
  ) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      WebhookVersion.V2,
    );
    const { data } = await client.patch(
      `/deals/${id}/products/${productAttachmentId}`,
      {
        item_price: itemPrice,
        quantity,
        discount,
        discount_type: discountType,
        product_variation_id: productVariationId,
        comments,
        tax,
      },
    );
    return { data };
  },
  inputs: updateDealProductInputs,
  examplePayload: updateDealProductExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateDealProductOutputSchema,
  }),
});
