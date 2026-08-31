import { action, outputSchema } from "@prismatic-io/spectral";
import { createStripeClient } from "../../client";
import { closeDisputeExamplePayload } from "../../examplePayloads/disputes";
import { closeDisputeInputs } from "../../inputs";
import { disputeOutputSchema } from "../../outputSchemas";
export const closeDispute = action({
  display: {
    label: "Close Dispute",
    description:
      "Close a dispute for a charge. Closing a dispute indicates that no evidence will be submitted and acknowledges the dispute as lost.",
  },
  performSafety: "notAllowed",
  perform: async (context, { timeout, stripeConnection, disputeId }) => {
    const client = createStripeClient({
      stripeConnection,
      timeout,
    });
    return {
      data: await client.disputes.close(disputeId),
    };
  },
  examplePerform: async (
    _context,
    { disputeId },
  ): Promise<{
    data: unknown;
  }> => {
    const dispute = closeDisputeExamplePayload.data as Record<string, unknown>;
    return {
      data: {
        ...dispute,
        id: disputeId,
      },
    };
  },
  inputs: closeDisputeInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: disputeOutputSchema,
  }),
  examplePayload: closeDisputeExamplePayload,
});
