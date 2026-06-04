import { action, util } from "@prismatic-io/spectral";
import { createStripeClient } from "../../auth";
import { listCardsExamplePayload } from "../../examplePayloads/cards";
import {
  connectionInput,
  customerId,
  endingBefore,
  limit,
  startingAfter,
  timeout,
} from "../../inputs";

export const listCards = action({
  display: {
    label: "List Cards",
    description: "Return a list of cards for a customer.",
  },
  perform: async (
    context,
    { customerId, timeout, startingAfter, limit, endingBefore, stripeConnection },
  ) => {
    const client = createStripeClient({
      stripeConnection,
      timeout: util.types.toInt(timeout),
    });
    return {
      data: await client.paymentMethods.list({
        customer: util.types.toString(customerId),
        type: "card",
        ending_before: util.types.toString(endingBefore) || undefined,
        limit: util.types.toNumber(limit) || undefined,
        starting_after: util.types.toString(startingAfter) || undefined,
      }),
    };
  },
  inputs: {
    timeout,
    customerId,
    startingAfter,
    limit,
    endingBefore,
    stripeConnection: connectionInput,
  },
  examplePayload: listCardsExamplePayload,
});
