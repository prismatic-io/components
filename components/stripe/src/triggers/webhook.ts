import { trigger } from "@prismatic-io/spectral";
export const webhook = trigger({
  display: {
    label: "Webhook (Deprecated)",
    description:
      "Receive and validate webhook requests from Stripe for configured webhooks.",
  },
  perform: async (context, payload) => {
    return Promise.resolve({
      payload,
    });
  },
  inputs: {},
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
});
