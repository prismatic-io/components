import { action, util, input } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, dealIdInput } from "../../inputs";
import { cleanNumber, cleanString } from "../../util";
import { WebhookVersion } from "../../constants";

export const updateDealProduct = action({
  display: {
    label: "Update Deal Product",
    description:
      "Updates product attachment details of the deal-product (a product already attached to a deal).",
  },
  perform: async (
    context,
    {
      connection,
      id,
      productAttachmentId,
      itemPrice,
      quantity,
      discount,
      discountType,
      productVariationId,
      comments,
      tax,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled, WebhookVersion.V2);
    const { data } = await client.patch(`/deals/${id}/products/${productAttachmentId}`, {
      item_price: itemPrice,
      quantity,
      discount,
      discount_type: discountType,
      product_variation_id: productVariationId,
      comments,
      tax,
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: dealIdInput,
    productAttachmentId: input({
      label: "Product Attachment ID",
      type: "string",
      required: true,
      clean: util.types.toString,
      comments: "The ID of the deal-product (the ID of the product attached to the deal)",
    }),
    itemPrice: input({
      label: "Item Price",
      type: "string",
      required: false,
      clean: cleanNumber,
      comments: "The price value of the product",
    }),
    quantity: input({
      label: "Quantity",
      type: "string",
      required: false,
      clean: cleanNumber,
      comments: "The quantity of the product",
    }),
    discount: input({
      label: "Discount Percentage",
      type: "string",
      required: false,
      default: "0",
      comments: "The discount %",
      clean: cleanNumber,
    }),
    discountType: input({
      label: "Discount Type",
      type: "string",
      required: false,
      comments: "The type of discount",
      model: [
        { label: "Percentage", value: "percentage" },
        { label: "Amount", value: "amount" },
      ],
      clean: cleanString,
    }),
    productVariationId: input({
      label: "Product Variation ID",
      type: "string",
      required: false,
      clean: cleanNumber,
      comments: "The ID of the product variation to use",
    }),
    comments: input({
      label: "Comments",
      type: "string",
      required: false,
      clean: cleanString,
      comments: "Any textual comment associated with this product-deal attachment",
    }),
    tax: input({
      label: "Tax",
      type: "string",
      required: false,
      default: "0",
      clean: cleanNumber,
      comments: "The tax percentage",
    }),
  },
});
