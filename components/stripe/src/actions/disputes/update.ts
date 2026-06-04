import { action, util } from "@prismatic-io/spectral";
import type Stripe from "stripe";
import { createStripeClient } from "../../auth";
import { updateDisputeExamplePayload } from "../../examplePayloads/disputes";
import { connectionInput, disputeId, evidence, metadata, submit, timeout } from "../../inputs";
import { keyValPairListToObject } from "../../util";
export const updateDispute = action({
  display: {
    label: "Update Dispute",
    description:
      "Update a dispute by submitting evidence or metadata. Use this action to provide evidence that helps Stripe resolve the dispute in the merchant's favor.",
  },
  perform: async (
    context,
    { timeout, stripeConnection, disputeId, evidence, metadata, submit },
  ) => {
    const client = createStripeClient({
      stripeConnection,
      timeout: util.types.toInt(timeout),
    });
    const params: Stripe.DisputeUpdateParams = {
      evidence: evidence ? JSON.parse(evidence) : undefined,
      metadata: metadata.length ? keyValPairListToObject(metadata) : undefined,
      submit: submit ? util.types.toBool(submit) : undefined,
    };
    return {
      data: await client.disputes.update(disputeId, params),
    };
  },
  inputs: {
    timeout,
    stripeConnection: connectionInput,
    disputeId,
    evidence,
    metadata,
    submit,
  },
  examplePayload: updateDisputeExamplePayload,
});
