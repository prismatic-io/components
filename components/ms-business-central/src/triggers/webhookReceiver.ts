import { trigger } from "@prismatic-io/spectral";

export const webhookReceiver = trigger({
  display: {
    label: "Manual Webhook",
    description:
      "Receive and validate webhook requests from Business Central for manually configured webhooks.",
  },
  scheduleSupport: "invalid",
  synchronousResponseSupport: "invalid",
  allowsBranching: false,
  perform: async (_context, payload) => {
    return Promise.resolve({
      payload,
      response: {
        statusCode: 200,
        contentType: "text/plain; charset=utf-8",
      },
    });
  },
  inputs: {},
});
