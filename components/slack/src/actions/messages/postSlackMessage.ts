import { action } from "@prismatic-io/spectral";
import { createWebhookClient } from "../../client";
import { webhookDefaultExamplePayload } from "../../examplePayloads";
import { postSlackMessageInputs } from "../../inputs";
import { debugLogger } from "../../util";

export const postSlackMessage = action({
  display: {
    label: "Post Slack Message From Webhook",
    description: "Post a message to a Slack channel from a webhook URL.",
  },
  perform: async ({ debug: { enabled: debug } }, { connection, message }) => {
    debugLogger({ message, debug });
    const webhook = createWebhookClient(connection);
    return {
      data: await webhook.send({
        text: message,
      }),
    };
  },
  inputs: postSlackMessageInputs,
  examplePayload: { data: webhookDefaultExamplePayload },
});
