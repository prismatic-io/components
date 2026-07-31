import { action } from "@prismatic-io/spectral";
import { createWebhookClient } from "../../client";
import { webhookDefaultExamplePayload } from "../../examplePayloads";
import { postWebhookBlockMessageInputs } from "../../inputs";
import { debugLogger } from "../../util";
export const postWebhookBlockMessage = action({
  display: {
    label: "Post Slack Block Message From Webhook",
    description:
      "Post a block-formatted message to a Slack channel from a webhook URL.",
  },
  inputs: postWebhookBlockMessageInputs,
  performSafety: "notAllowed",
  perform: async (
    { debug: { enabled: debug } },
    { connection, message, blocks },
  ) => {
    debugLogger({ message, blocks, debug });
    const webhook = createWebhookClient(connection);
    return {
      data: await webhook.send({
        text: message,
        ...blocks,
      }),
    };
  },
  examplePerformSafety: "safe",
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: webhookDefaultExamplePayload,
  }),
  examplePayload: { data: webhookDefaultExamplePayload },
});
