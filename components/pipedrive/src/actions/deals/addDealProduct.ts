import { action, util, input } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, dealIdInput, productIdInput } from "../../inputs";
import { cleanNumber, cleanString } from "../../util";
import { WebhookVersion } from "../../constants";

export const addDealProduct = action({
  display: {
    label: "Add Deal Product",
    description:
      "Adds a product to the deal, eventually creating a new item called a deal-product.",
  },
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
    const client = createClient(connection, context.debug.enabled, WebhookVersion.V2);
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
  inputs: {
    connection: connectionInput,
    id: dealIdInput,
    productId: { ...productIdInput, comments: "The ID of the product to add to the deal" },
    itemPrice: input({
      label: "Item Price",
      type: "string",
      required: true,
      clean: util.types.toNumber,
      comments: "The price value of the product",
    }),
    quantity: input({
      label: "Quantity",
      type: "string",
      required: true,
      clean: util.types.toNumber,
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
    isEnabled: input({
      label: "Is Enabled",
      type: "boolean",
      required: false,
      comments: "Whether the product is enabled on the deal or not",
      clean: util.types.toBool,
    }),
  },
});
