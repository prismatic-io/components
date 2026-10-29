import { trigger, util } from "@prismatic-io/spectral";
import { webhookExamplePayload } from "../examplePayloads";
import { webhookInputs } from "../inputs";

export const webhook = trigger({
  display: {
    label: "Manual Webhook",
    description:
      "Receive and validate webhook requests from Jamf Pro for manually configured webhook subscriptions.",
  },
  inputs: webhookInputs,
  perform: async (context, payload, { authHeaderName, authHeaderValue }) => {
    if (
      !context.isSimulatedTestExecution &&
      authHeaderName &&
      authHeaderValue
    ) {
      const headers = util.types.lowerCaseHeaders(payload.headers);
      if (headers[authHeaderName.toLowerCase()] !== authHeaderValue) {
        throw new Error(
          "Jamf webhook header authentication failed: missing or invalid auth header.",
        );
      }
    }
    return { payload };
  },
  scheduleSupport: "invalid",
  synchronousResponseSupport: "valid",
  examplePayload: webhookExamplePayload,
});
