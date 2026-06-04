import { trigger } from "@prismatic-io/spectral";

export const pubSubWebhook = trigger({
  display: {
    label: "Pub/Sub Webhook",
    description:
      "Receive push notifications from Google Cloud Pub/Sub for Merchant Center events such as order status changes. Requires a Pub/Sub topic registered with the Content API and a push subscription configured to forward messages to this endpoint.",
  },
  perform: async (_context, payload) => {
    return Promise.resolve({
      payload,
      response: { statusCode: 200, contentType: "application/json" },
    });
  },
  inputs: {},
  synchronousResponseSupport: "valid",
  scheduleSupport: "valid",
});

export default { pubSubWebhook };
