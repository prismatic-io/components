import { action, util } from "@prismatic-io/spectral";
import { createStripeClient } from "../../auth";
import { closeDisputeExamplePayload } from "../../examplePayloads/disputes";
import { connectionInput, disputeId, timeout } from "../../inputs";

export const closeDispute = action({
  display: {
    label: "Close Dispute",
    description:
      "Close a dispute for a charge. Closing a dispute indicates that no evidence will be submitted and acknowledges the dispute as lost.",
  },
  perform: async (context, { timeout, stripeConnection, disputeId }) => {
    const client = createStripeClient({
      stripeConnection,
      timeout: util.types.toInt(timeout),
    });
    return {
      data: await client.disputes.close(disputeId),
    };
  },
  inputs: { timeout, stripeConnection: connectionInput, disputeId },
  examplePayload: closeDisputeExamplePayload,
});
