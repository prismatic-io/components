import { trigger, util } from "@prismatic-io/spectral";
import {
  BOX_SIGNATURE_PRIMARY_HEADER,
  BOX_SIGNATURE_SECONDARY_HEADER,
} from "../constants";
import { webhookExamplePayload } from "../examplePayloads";
import { webhookInputs } from "../inputs";
import { validateBoxWebhookSignature } from "../util";

export const webhook = trigger({
  display: {
    label: "Manual Webhook",
    description:
      "Receive and validate webhook requests from Box for manually configured webhook subscriptions.",
  },
  perform: async (
    context,
    payload,
    { primarySignatureKey, secondarySignatureKey },
  ) => {
    if (context.isSimulatedTestExecution) {
      return Promise.resolve({
        payload,
      });
    }

    const { rawBody, headers } = payload;
    const lowerHeaders = util.types.lowerCaseHeaders(headers);
    const primarySignature = lowerHeaders[BOX_SIGNATURE_PRIMARY_HEADER];
    const secondarySignature = lowerHeaders[BOX_SIGNATURE_SECONDARY_HEADER];

    const primaryKey =
      primarySignatureKey ||
      (context.crossFlowState.primarySignatureKey as string | undefined);
    const secondaryKey =
      secondarySignatureKey ||
      (context.crossFlowState.secondarySignatureKey as string | undefined);

    if (primaryKey || secondaryKey || primarySignature || secondarySignature) {
      const isValid = validateBoxWebhookSignature({
        body: util.types.toString(rawBody.data),
        headers: lowerHeaders,
        primaryKey,
        secondaryKey,
      });

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
  inputs: webhookInputs,
  examplePayload: webhookExamplePayload,
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
});
