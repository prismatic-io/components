import { action, outputSchema } from "@prismatic-io/spectral";
import type Stripe from "stripe";
import { createStripeClient } from "../../client";
import { updateDisputeExamplePayload } from "../../examplePayloads/disputes";
import { updateDisputeInputs } from "../../inputs";
import { disputeOutputSchema } from "../../outputSchemas";
export const updateDispute = action({
  display: {
    label: "Update Dispute",
    description:
      "Update a dispute by submitting evidence or metadata. Use this action to provide evidence that helps Stripe resolve the dispute in the merchant's favor.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { timeout, stripeConnection, disputeId, evidence, metadata, submit },
  ) => {
    const client = createStripeClient({
      stripeConnection,
      timeout,
    });
    const params: Stripe.DisputeUpdateParams = {
      evidence: evidence,
      metadata,
      submit,
    };
    return {
      data: await client.disputes.update(disputeId, params),
    };
  },
  examplePerform: async (
    _context,
    { disputeId, evidence, metadata, submit },
  ): Promise<{
    data: unknown;
  }> => {
    const dispute = updateDisputeExamplePayload.data as Record<string, unknown>;
    const evidenceDetails = dispute.evidence_details as Record<string, unknown>;
    return {
      data: {
        ...dispute,
        id: disputeId,
        evidence: {
          ...(dispute.evidence as Record<string, unknown>),
          ...evidence,
        },
        evidence_details: {
          ...evidenceDetails,
          has_evidence: Boolean(evidence),
          submission_count: submit ? 1 : evidenceDetails.submission_count,
        },
        metadata,
      },
    };
  },
  inputs: updateDisputeInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: disputeOutputSchema,
  }),
  examplePayload: updateDisputeExamplePayload,
});
