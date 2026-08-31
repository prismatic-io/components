import { action, outputSchema } from "@prismatic-io/spectral";
import type Stripe from "stripe";
import { createStripeClient } from "../../client";
import { searchChargesExamplePayload } from "../../examplePayloads/charges";
import { searchChargesInputs } from "../../inputs";
import { searchChargesOutputSchema } from "../../outputSchemas";
export const searchCharges = action({
  display: {
    label: "Search Charges",
    description:
      "Search for charges previously created using Stripe's Search Query Language.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { stripeConnection, timeout, query, pagination },
  ) => {
    const client = createStripeClient({
      stripeConnection: stripeConnection,
      timeout,
    });
    const options: Stripe.ChargeSearchParams = {
      query,
      limit: pagination.limit,
      ...(pagination.page && { page: pagination.page }),
    };
    return {
      data: await client.charges.search(options),
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: searchChargesExamplePayload.data,
  }),
  inputs: searchChargesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: searchChargesOutputSchema,
  }),
  examplePayload: searchChargesExamplePayload,
});
