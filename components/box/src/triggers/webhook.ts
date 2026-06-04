import { trigger, util } from "@prismatic-io/spectral";
import Box from "box-node-sdk";

export const webhook = trigger({
  display: {
    label: "Manual Webhook",
    description:
      "Receive and validate webhook requests from Box for manually configured webhook subscriptions.",
  },
  perform: async (context, payload) => {
    if (context.isSimulatedTestExecution) {
      return Promise.resolve({
        payload,
      });
    }

    const { rawBody, headers } = payload;
    const lowerHeaders = util.types.lowerCaseHeaders(headers);
    const primarySignature = lowerHeaders["box-signature-primary"];
    const secondarySignature = lowerHeaders["box-signature-secondary"];

    if (primarySignature || secondarySignature) {
      const primarySignatureKey = context.crossFlowState
        .primarySignatureKey as string;
      const secondarySignatureKey = context.crossFlowState
        .secondarySignatureKey as string;

      
      const isValid = Box.validateWebhookMessage(
        util.types.toString(rawBody.data),
        headers,
        primarySignatureKey,
        secondarySignatureKey,
      );

      if (!isValid) {
        throw new Error(
          "The request has failed Box signature validation. Rejecting.",
        );
      }
    }

    return Promise.resolve({
      payload,
    });
  },
  inputs: {},
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
});
