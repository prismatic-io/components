import { type HttpResponse, trigger } from "@prismatic-io/spectral";
import { smartsheetWebhookExamplePayload } from "../examplePayloads";
import { smartsheetWebhookInputs } from "../inputs";
import { pollChangesTrigger } from "./pollChangesTrigger";

export const smartsheetWebhook = trigger({
  display: {
    label: "Webhook",
    description:
      "Receive and validate webhook requests from Smartsheet for manually configured webhook subscriptions.",
  },
  allowsBranching: true,
  staticBranchNames: ["Event", "URL Verify"],
  perform: async (_context, payload) => {
    if (payload.headers["Smartsheet-Hook-Challenge"]) {
      const response: HttpResponse = {
        statusCode: 200,
        contentType: "application/json",
        headers: {
          "Smartsheet-Hook-Response":
            payload.headers["Smartsheet-Hook-Challenge"],
        },
        body: JSON.stringify({
          smartsheetHookResponse: payload.headers["Smartsheet-Hook-Challenge"],
        }),
      };

      return Promise.resolve({
        payload,
        response,
        branch: "URL Verify",
      });
    }
    return Promise.resolve({
      payload,
      branch: "Event",
    });
  },
  inputs: smartsheetWebhookInputs,
  examplePayload: smartsheetWebhookExamplePayload,
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
});

export default { smartsheetWebhook, pollChangesTrigger };
