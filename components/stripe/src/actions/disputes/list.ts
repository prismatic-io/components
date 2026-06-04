import { action, util } from "@prismatic-io/spectral";
import { createStripeClient } from "../../auth";
import { listDisputesExamplePayload } from "../../examplePayloads/disputes";
import {
  chargeId,
  connectionInput,
  created,
  endingBefore,
  limit,
  paymentIntent,
  startingAfter,
  timeout,
} from "../../inputs";

import type Stripe from "stripe";

export const listDisputes = action({
  display: {
    label: "List Disputes",
    description: "Return a list of disputes.",
  },
  perform: async (
    context,
    {
      stripeConnection,
      timeout,
      limit,
      startingAfter,
      chargeId,
      paymentIntent,
      created,
      endingBefore,
    },
  ) => {
    const client = createStripeClient({
      stripeConnection: stripeConnection,
      timeout: util.types.toInt(timeout),
    });

    const params: Stripe.DisputeListParams = {
      charge: chargeId || undefined,
      payment_intent: paymentIntent || undefined,
      created: created ? JSON.parse(created) : undefined,
      ending_before: endingBefore || undefined,
      limit: limit ? util.types.toInt(limit) : undefined,
      starting_after: startingAfter || undefined,
    };
    return {
      data: await client.disputes.list(params),
    };
  },
  inputs: {
    timeout,
    stripeConnection: connectionInput,
    limit: { ...limit, clean: util.types.toString },
    startingAfter: { ...startingAfter, clean: util.types.toString },
    chargeId: {
      ...chargeId,
      label: "Charge",
      required: false,
      comments: "Only return disputes associated to the charge specified by this charge ID.",
      clean: util.types.toString,
    },
    paymentIntent,
    created,
    endingBefore: { ...endingBefore, clean: util.types.toString },
  },
  examplePayload: listDisputesExamplePayload,
});
