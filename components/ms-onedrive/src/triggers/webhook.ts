import { type HttpResponse, trigger, util } from "@prismatic-io/spectral";

export const webhook = trigger({
  display: {
    label: "Webhook",
    description:
      "Receive and validate webhook requests from OneDrive for manually configured webhook subscriptions.",
  },
  scheduleSupport: "invalid",
  synchronousResponseSupport: "valid",
  allowsBranching: true,
  inputs: {},
  staticBranchNames: ["Notification", "URL Validation"],
  perform: async (_context, payload) => {
    
    
    const rawValidationToken = payload.queryParameters?.validationToken;
    const validationToken = util.types.toString(rawValidationToken);

    const response: HttpResponse = {
      statusCode: 200,
      contentType: "text/plain",
      body: validationToken,
    };

    return Promise.resolve({
      payload,
      response,
      branch: validationToken ? "URL Validation" : "Notification",
    });
  },
  
});
