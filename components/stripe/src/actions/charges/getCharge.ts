import { action, outputSchema } from "@prismatic-io/spectral";
import { createStripeClient } from "../../client";
import { getChargeExamplePayload } from "../../examplePayloads/charges";
import { getChargeInputs } from "../../inputs";
import { chargeOutputSchema } from "../../outputSchemas";
export const getCharge = action({
  display: {
    label: "Get Charge",
    description:
      "Retrieve the details of a charge that has previously been created.",
  },
  performSafety: "safe",
  perform: async (context, params) => {
    const client = createStripeClient({
      stripeConnection: params.stripeConnection,
      timeout: params.timeout,
    });
    return {
      data: await client.charges.retrieve(params.chargeId),
    };
  },
  inputs: getChargeInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: chargeOutputSchema,
  }),
  examplePayload: getChargeExamplePayload,
});
