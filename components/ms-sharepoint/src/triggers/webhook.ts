import { trigger, util } from "@prismatic-io/spectral";
import { TriggerBranches } from "../actions/enums";

export const webhook = trigger({
  display: {
    label: "Webhook",
    description:
      "Receive and validate webhook requests from SharePoint for manually configured webhook subscriptions.",
  },
  scheduleSupport: "invalid",
  synchronousResponseSupport: "valid",
  allowsBranching: true,
  inputs: {},
  staticBranchNames: [TriggerBranches.Notification, TriggerBranches.URLValidation],
  perform: async (_context, payload) => {
    
    
    const rawValidationToken = payload.queryParameters?.validationToken;
    const validationToken = util.types.toString(rawValidationToken);

    if (validationToken)
      return Promise.resolve({
        payload,
        response: {
          statusCode: 200,
          contentType: "text/plain",
          body: validationToken,
        },
        branch: TriggerBranches.URLValidation,
      });

    return Promise.resolve({
      payload,
      branch: TriggerBranches.Notification,
    });
  },
});
