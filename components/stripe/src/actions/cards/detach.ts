import { action, util } from "@prismatic-io/spectral";
import { createStripeClient } from "../../auth";
import { detachCardExamplePayload } from "../../examplePayloads/cards";
import { connectionInput, customerId, paymentId, timeout } from "../../inputs";

export const detachCard = action({
  display: {
    label: "Detach Card",
    description: "Detach a card from a customer.",
  },
  perform: async (context, { paymentId, timeout, stripeConnection }) => {
    const client = createStripeClient({
      stripeConnection,
      timeout: util.types.toInt(timeout),
    });
    return {
      data: await client.paymentMethods.detach(util.types.toString(paymentId)),
    };
  },
  inputs: {
    timeout,
    customerId,
    paymentId,
    stripeConnection: connectionInput,
  },
  examplePayload: detachCardExamplePayload,
});
