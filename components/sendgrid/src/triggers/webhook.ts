import { trigger } from "@prismatic-io/spectral";

export const webhook = trigger({
  display: {
    label: "Manual Webhook",
    description:
      "Receive and validate webhook requests from SendGrid for manually configured webhooks.",
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
