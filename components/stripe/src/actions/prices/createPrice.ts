import { action, outputSchema, util } from "@prismatic-io/spectral";
import type Stripe from "stripe";
import { createStripeClient } from "../../client";
import { createPriceExamplePayload } from "../../examplePayloads/prices";
import { createPriceInputs } from "../../inputs";
import { priceOutputSchema } from "../../outputSchemas";
export const createPrice = action({
  display: {
    label: "Create Price",
    description: "Create a new price.",
  },
  performSafety: "notAllowed",
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
      timeout,
    });
    return {
      data: await client.prices.create({
        currency: util.types.toString(currency),
        product: productId,
        unit_amount: unitPrice,
        active: active,
        nickname: nickname,
        recurring: {
          interval: recurringInterval as
            | Stripe.PriceCreateParams.Recurring.Interval
            | undefined,
        },
        metadata,
        ...fieldValues,
      }),
    };
  },
  examplePerform: async (
    _context,
    {
      productId,
      currency,
      unitPrice,
      active,
      nickname,
      recurringInterval,
      metadata,
    },
  ): Promise<{
    data: unknown;
  }> => {
    const price = createPriceExamplePayload.data as Record<string, unknown>;
    return {
      data: {
        ...price,
        product: productId,
        currency: currency ?? price.currency,
        unit_amount: unitPrice ?? price.unit_amount,
        unit_amount_decimal:
          unitPrice === undefined ? price.unit_amount_decimal : `${unitPrice}`,
        active,
        nickname: nickname ?? price.nickname,
        recurring: recurringInterval
          ? {
              ...(price.recurring as Record<string, unknown>),
              interval: recurringInterval,
            }
          : price.recurring,
        metadata,
      },
    };
  },
  inputs: createPriceInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: priceOutputSchema,
  }),
  examplePayload: createPriceExamplePayload,
});
