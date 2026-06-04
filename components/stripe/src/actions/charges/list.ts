import { action, util } from "@prismatic-io/spectral";
import { createStripeClient } from "../../auth";
import { listChargesExamplePayload } from "../../examplePayloads/charges";
import { connectionInput, limit, startingAfter, timeout } from "../../inputs";

export const listCharges = action({
  display: {
    label: "List Charges",
    description: "Return a list of all charges.",
  },
  perform: async (context, params) => {
    const client = createStripeClient({
      stripeConnection: params.stripeConnection,
      timeout: util.types.toInt(params.timeout),
    });
    return {
      data: await client.charges.list({
        limit: util.types.toNumber(params.limit) || undefined,
        starting_after: util.types.toString(params.startingAfter) || undefined,
      }),
    };
  },
  inputs: { timeout, limit, startingAfter, stripeConnection: connectionInput },
  examplePayload: listChargesExamplePayload,
});
