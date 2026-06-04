import { action, util } from "@prismatic-io/spectral";
import type Stripe from "stripe";
import { createStripeClient } from "../../auth";
import { createProductExamplePayload } from "../../examplePayloads/products";
import {
  active,
  connectionInput,
  description,
  fieldValues,
  metadata,
  productCaption,
  productImages,
  productName,
  productType,
  productUrl,
  shippable,
  timeout,
} from "../../inputs";
import { keyValPairListToObject } from "../../util";

export const createProduct = action({
  display: {
    label: "Create Product",
    description: "Create a new product.",
  },
  perform: async (
    context,
    {
      productName,
      productType,
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
      data: await client.products.create({
        name: util.types.toString(productName),
        active: util.types.toBool(active),
        description: util.types.toString(description) || undefined,
        images: productImages?.map((image) => util.types.toString(image)),
        type: util.types.toString(productType) as Stripe.ProductCreateParams.Type,
        ...(util.types.keyValPairListToObject(fieldValues) || {}),
        shippable: util.types.toBool(shippable) || undefined,
        url: util.types.toString(productUrl) || undefined,
        metadata: keyValPairListToObject(metadata),
      }),
    };
  },
  inputs: {
    productName,
    productType,
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
  examplePayload: createProductExamplePayload,
});
