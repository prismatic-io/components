import { action, util } from "@prismatic-io/spectral";
import type Stripe from "stripe";
import { createStripeClient } from "../../auth";
import { createPriceExamplePayload } from "../../examplePayloads/prices";
import {
  active,
  connectionInput,
  currency,
  fieldValues,
  metadata,
  nickname,
  productId,
  recurringInterval,
  timeout,
  unitPrice,
} from "../../inputs";
import { keyValPairListToObject } from "../../util";

export const createPrice = action({
  display: {
    label: "Create Price",
    description: "Create a new price.",
  },
  perform: async (
    context,
    {
      productId,
      currency,
      unitPrice,
      active,
      nickname,
      recurringInterval,
      fieldValues,
      metadata,
      timeout,
      stripeConnection,
    },
  ) => {
    const client = createStripeClient({
      stripeConnection,
      timeout: util.types.toInt(timeout),
    });
    return {
      data: await client.prices.create({
        currency: util.types.toString(currency),
        product: util.types.toString(productId),
        unit_amount: util.types.toInt(unitPrice) * 100 || undefined,
        active: util.types.toBool(active),
        nickname: util.types.toString(nickname) || undefined,
        recurring: {
          interval:
            (util.types.toString(
              recurringInterval,
            ) as Stripe.PriceCreateParams.Recurring.Interval) || undefined,
        },
        metadata: keyValPairListToObject(metadata),
        ...(util.types.keyValPairListToObject(fieldValues) || {}),
      }),
    };
  },
  inputs: {
    productId,
    currency,
    unitPrice,
    active,
    nickname,
    recurringInterval,
    fieldValues,
    metadata,
    timeout,
    stripeConnection: connectionInput,
  },
  examplePayload: createPriceExamplePayload,
});
