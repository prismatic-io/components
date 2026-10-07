import { trigger } from "@prismatic-io/spectral";
import { webhookExamplePayload } from "../examplePayloads";
import { webhookInputs } from "../inputs";
import { validateContentfulWebhookRequest } from "../util";
export const webhook = trigger({
  display: {
    label: "Webhook",
    description:
      "Receive and validate webhook requests from Contentful for manually configured webhook subscriptions.",
  },
  perform: async (context, payload, { signingSecret }) => {
    validateContentfulWebhookRequest(payload, {
      signingSecret,
      isSimulatedTestExecution: context.isSimulatedTestExecution,
      flowWebhookUrl: context.webhookUrls[context.flow.name],
    });
    return { payload };
  },
  inputs: webhookInputs,
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
  examplePayload: webhookExamplePayload,
});
