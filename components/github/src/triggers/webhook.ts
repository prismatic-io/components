import { trigger } from "@prismatic-io/spectral";
import { webhookExamplePayload } from "../examplePayloads";
import { webhookInputs } from "../inputs";
import { validateWebhookSignature } from "../utils";
export const webhook = trigger({
  display: {
    label: "Webhook",
    description:
      "Receive and validate webhook requests from GitHub for webhooks you configure.",
  },
  perform: async (context, payload, params) => {
    if (context.isSimulatedTestExecution) {
      return Promise.resolve({ payload });
    }
    validateWebhookSignature(payload, params.webhookSecret);
    return Promise.resolve({ payload });
  },
  inputs: webhookInputs,
  examplePayload: webhookExamplePayload,
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
});
