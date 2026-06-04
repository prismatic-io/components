import { action, util } from "@prismatic-io/spectral";
import { createStripeClient } from "../../auth";
import { getChargeExamplePayload } from "../../examplePayloads/charges";
import { chargeId, connectionInput, timeout } from "../../inputs";

export const getCharge = action({
  display: {
    label: "Get Charge",
    description: "Retrieve the details of a charge that has previously been created.",
  },
  perform: async (context, params) => {
    const client = createStripeClient({
      stripeConnection: params.stripeConnection,
      timeout: util.types.toInt(params.timeout),
    });
    return {
      data: await client.charges.retrieve(params.chargeId),
    };
  },
  inputs: { timeout, stripeConnection: connectionInput, chargeId },
  examplePayload: getChargeExamplePayload,
});
