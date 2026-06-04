import { trigger } from "@prismatic-io/spectral";

const adobeIoEventWebhook = trigger({
  display: {
    label: "Webhook",
    description:
      "Receive and validate webhook requests from Adobe I/O for webhooks you configure",
  },

  allowsBranching: true,
  staticBranchNames: ["Trigger", "Webhook Verify"],
  perform: async (_context, payload) => {
    const queryParameters = payload.queryParameters;
    if (queryParameters?.challenge) {
      
      return Promise.resolve({
        payload,
        response: {
          statusCode: 200,
          body: queryParameters.challenge,
          contentType: "text/plain",
        },
        branch: "Webhook Verify",
      });
    } else {
      return Promise.resolve({
        payload,
        branch: "Trigger",
      });
    }
  },
  inputs: {},
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
});

export default { adobeIoEventWebhook };
