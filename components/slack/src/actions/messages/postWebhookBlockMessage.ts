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
  perform: async (
    { debug: { enabled: debug } },
    { connection, message, blocks }
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
  inputs: postWebhookBlockMessageInputs,
  examplePayload: { data: webhookDefaultExamplePayload },
});
