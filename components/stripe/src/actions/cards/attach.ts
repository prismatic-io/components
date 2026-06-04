import { action, util } from "@prismatic-io/spectral";
import { createStripeClient } from "../../auth";
import { attachCardExamplePayload } from "../../examplePayloads/cards";
import { connectionInput, customerId, paymentId, timeout } from "../../inputs";

export const attachCard = action({
  display: {
    label: "Attach Card",
    description: "Attach a card to a customer.",
  },
  perform: async (context, { paymentId, customerId, timeout, stripeConnection }) => {
    const client = createStripeClient({
      stripeConnection,
      timeout: util.types.toInt(timeout),
    });

    return {
      data: await client.paymentMethods.attach(util.types.toString(paymentId), {
        customer: util.types.toString(customerId),
      }),
    };
  },
  inputs: {
    paymentId,
    customerId,
    timeout,
    stripeConnection: connectionInput,
  },
  examplePayload: attachCardExamplePayload,
});
