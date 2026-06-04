import { trigger } from "@prismatic-io/spectral";

export const postmarkWebhook = trigger({
  display: {
    label: "Webhook",
    description:
      "Receive and validate webhook requests from Postmark for webhooks you configure.",
  },
  perform: async (context, payload) => {
    
    
    

    return Promise.resolve({
      payload,
      response: { statusCode: 200, contentType: "application/json" },
      branch: "Notification",
    });
  },
  inputs: {},
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
});

export default { postmarkWebhook };
