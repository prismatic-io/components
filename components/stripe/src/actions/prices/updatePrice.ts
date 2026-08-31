import { action, outputSchema } from "@prismatic-io/spectral";
import { createStripeClient } from "../../client";
import { updatePriceExamplePayload } from "../../examplePayloads/prices";
import { updatePriceInputs } from "../../inputs";
import { priceOutputSchema } from "../../outputSchemas";
export const updatePrice = action({
  display: {
    label: "Update Price",
    description: "Update an existing price by ID.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      priceId,
      active,
      nickname,
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
      data: await client.prices.update(priceId, {
        active,
        nickname: nickname,
        metadata,
        ...fieldValues,
      }),
    };
  },
  examplePerform: async (
    _context,
    { priceId, active, nickname, metadata },
  ): Promise<{
    data: unknown;
  }> => {
    const price = updatePriceExamplePayload.data as Record<string, unknown>;
    return {
      data: {
        ...price,
        id: priceId,
        active,
        nickname: nickname ?? price.nickname,
        metadata,
      },
    };
  },
  inputs: updatePriceInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: priceOutputSchema,
  }),
  examplePayload: updatePriceExamplePayload,
});
