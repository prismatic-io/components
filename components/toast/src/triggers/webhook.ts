import { trigger } from "@prismatic-io/spectral";
import { webhookInputs as inputs } from "../inputs/triggers";
import { getSignature } from "../utils";

export const webhook = trigger({
  display: {
    label: "Webhook",
    description:
      "Receive and validate webhook requests from Toast for webhooks you configure.",
  },
  perform: async (_context, payload, { secret }) => {
    const signature = getSignature(
      secret,
      payload.body.data as string,
      (payload.body?.data as { timestamp: string }).timestamp,
    );

    const signatureHeader = payload.headers["Toast-Signature"];

    if (!signatureHeader) {
      return Promise.reject({
        error: "No signature",
      });
    }

    if (signature !== signatureHeader) {
      return Promise.reject({
        error: "Invalid signature",
      });
    }

    return Promise.resolve({
      payload,
    });
  },
  inputs,
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
});
