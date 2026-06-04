import { action, util } from "@prismatic-io/spectral";
import type Stripe from "stripe";
import { createStripeClient } from "../../auth";
import { searchChargesExamplePayload } from "../../examplePayloads/charges";
import { connectionInput, limit, page, query, timeout } from "../../inputs";

export const searchCharges = action({
  display: {
    label: "Search Charges",
    description: "Search for charges previously created using Stripe's Search Query Language.",
  },
  perform: async (context, { stripeConnection, timeout, query, limit, page }) => {
    const client = createStripeClient({
      stripeConnection: stripeConnection,
      timeout: util.types.toInt(timeout),
    });
    const options: Stripe.ChargeSearchParams = {
      query,
      ...(limit && { limit: util.types.toInt(limit) }),
      ...(page && { page }),
    };
    return {
      data: await client.charges.search(options),
    };
  },
  inputs: {
    timeout,
    stripeConnection: connectionInput,
    query,
    limit: {
      ...limit,
      comments:
        "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      clean: util.types.toString,
    },
    page,
  },
  examplePayload: searchChargesExamplePayload,
});
