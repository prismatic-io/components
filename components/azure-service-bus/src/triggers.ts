import { trigger } from "@prismatic-io/spectral";

export const subscriptionMessageWebhook = trigger({
  display: {
    label: "Webhook",
    description:
      "Receive and validate webhook requests from Azure Service Bus for webhooks you configure.",
  },
  perform: async (_context, payload) => {
    return Promise.resolve({
      payload,
    });
  },
  inputs: {},
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
});

export default { subscriptionMessageWebhook };
