import { action, outputSchema } from "@prismatic-io/spectral";
import { createStripeClient } from "../../client";
import { getDisputeExamplePayload } from "../../examplePayloads/disputes";
import { getDisputeInputs } from "../../inputs";
import { disputeOutputSchema } from "../../outputSchemas";
export const getDispute = action({
  display: {
    label: "Get Dispute",
    description: "Retrieve a dispute by ID.",
  },
  performSafety: "safe",
  perform: async (context, { timeout, stripeConnection, disputeId }) => {
    const client = createStripeClient({
      stripeConnection,
      timeout,
    });
    return {
      data: await client.disputes.retrieve(disputeId),
    };
  },
  inputs: getDisputeInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: disputeOutputSchema,
  }),
  examplePayload: getDisputeExamplePayload,
});
