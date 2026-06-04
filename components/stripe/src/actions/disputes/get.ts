import { action, util } from "@prismatic-io/spectral";
import { createStripeClient } from "../../auth";
import { getDisputeExamplePayload } from "../../examplePayloads/disputes";
import { connectionInput, disputeId, timeout } from "../../inputs";

export const getDispute = action({
  display: {
    label: "Get Dispute",
    description: "Retrieve a dispute by ID.",
  },
  perform: async (context, { timeout, stripeConnection, disputeId }) => {
    const client = createStripeClient({
      stripeConnection,
      timeout: util.types.toInt(timeout),
    });
    return {
      data: await client.disputes.retrieve(disputeId),
    };
  },
  inputs: { timeout, stripeConnection: connectionInput, disputeId },
  examplePayload: getDisputeExamplePayload,
});
