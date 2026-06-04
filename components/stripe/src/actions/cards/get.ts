import { action, util } from "@prismatic-io/spectral";
import { createStripeClient } from "../../auth";
import { getCardExamplePayload } from "../../examplePayloads/cards";
import { connectionInput, customerId, paymentId, timeout } from "../../inputs";

export const getCard = action({
  display: {
    label: "Get Card",
    description: "Retrieve the information and metadata of a card by ID.",
  },
  perform: async (context, { paymentId, timeout, stripeConnection }) => {
    const client = createStripeClient({
      stripeConnection,
      timeout: util.types.toInt(timeout),
    });
    return {
      data: await client.paymentMethods.retrieve(util.types.toString(paymentId)),
    };
  },
  inputs: {
    timeout,
    customerId,
    paymentId,
    stripeConnection: connectionInput,
  },
  examplePayload: getCardExamplePayload,
});
