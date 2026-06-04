import { action, util } from "@prismatic-io/spectral";
import { createStripeClient } from "../../auth";
import { updateProductExamplePayload } from "../../examplePayloads/products";
import {
  active,
  connectionInput,
  description,
  fieldValues,
  metadata,
  productCaption,
  productId,
  productImages,
  productUrl,
  shippable,
  timeout,
  updateProductName,
} from "../../inputs";
import { keyValPairListToObject } from "../../util";

export const updateProduct = action({
  display: {
    label: "Update Product",
    description: "Update an existing product.",
  },
  perform: async (
    context,
    {
      productId,
      updateProductName,
      productUrl,
      shippable,
      productCaption,
      active,
      description,
      productImages,
      metadata,
      fieldValues,
      timeout,
      stripeConnection,
    },
  ) => {
    const client = createStripeClient({
      stripeConnection,
      timeout: util.types.toInt(timeout),
    });

    return {
      data: await client.products.update(util.types.toString(productId), {
        name: util.types.toString(updateProductName) || undefined,
        active: util.types.toBool(active),
        description: util.types.toString(description) || undefined,
        images: productImages?.map((image) => util.types.toString(image)),
        ...(util.types.keyValPairListToObject(fieldValues) || {}),
        shippable: util.types.toBool(shippable) || undefined,
        url: util.types.toString(productUrl) || undefined,
        metadata: keyValPairListToObject(metadata),
      }),
    };
  },
  inputs: {
    productId,
    updateProductName,
    productUrl,
    shippable,
    active,
    description,
    productImages,
    metadata,
    fieldValues,
    productCaption: {
      ...productCaption,
      comments: `(DEPRECATED) ${productCaption.comments}`,
    },
    timeout,
    stripeConnection: connectionInput,
  },
  examplePayload: updateProductExamplePayload,
});
