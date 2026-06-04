import { action, input } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, productIdInput } from "../../inputs";
import { cleanCode, cleanNumber, cleanString } from "../../util";
import { WebhookVersion } from "../../constants";

export const updateProduct = action({
  display: {
    label: "Update Product",
    description: "Updates a product.",
  },
  perform: async (
    context,
    { connection, id, name, code, unit, tax, visibleTo, ownerId, prices },
  ) => {
    const client = createClient(connection, context.debug.enabled, WebhookVersion.V2);
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
  inputs: {
    connection: connectionInput,
    id: productIdInput,
    name: input({
      label: "Name",
      type: "string",
      required: false,
      clean: cleanString,
      comments: "The name of the product",
      example: "Professional Software License",
      placeholder: "Enter product name",
    }),
    code: input({
      label: "Code",
      type: "string",
      required: false,
      clean: cleanString,
      comments: "The product code",
      example: "PROD-001",
      placeholder: "Enter product code",
    }),
    unit: input({
      label: "Unit",
      type: "string",
      required: false,
      clean: cleanString,
      comments: "The unit in which this product is sold",
      example: "license",
      placeholder: "Enter unit",
    }),
    tax: input({
      label: "Tax",
      type: "string",
      required: false,
      default: "0",
      clean: cleanNumber,
      comments: "The tax percentage",
      example: "10",
      placeholder: "Enter tax percentage",
    }),
    visibleTo: input({
      label: "Visible To",
      type: "string",
      required: false,
      model: [
        { label: "1", value: "1" },
        { label: "3", value: "3" },
        { label: "5", value: "5" },
        { label: "7", value: "7" },
      ],
      clean: cleanNumber,
      comments: "The visibility of the product",
    }),
    ownerId: input({
      label: "Owner ID",
      type: "string",
      required: false,
      clean: cleanNumber,
      comments: "The ID of the user who will be marked as the owner of this product",
      example: "123",
      placeholder: "Enter User ID",
    }),
    prices: input({
      label: "Prices",
      type: "code",
      language: "json",
      required: false,
      comments:
        'An array of objects, each containing: "currency" (string), "price" (number), "cost" (number, optional), "overhead_cost" (number, optional)',
      clean: cleanCode,
      example: JSON.stringify(
        [
          {
            product_id: 1,
            price: 5,
            currency: "EUR",
            cost: 2,
            direct_cost: 1,
            notes: "this is a note",
          },
        ],
        null,
        2,
      ),
    }),
  },
});
