import { action } from "@prismatic-io/spectral";
import { getWebhookInputs } from "../../inputs";
import { getWebhookExamplePayload } from "../../examplePayloads";
import { getWebhook } from "../../utils/webhooks";

export default action({
  display: {
    label: "Get Webhook",
    description:
      "Get information about a specific webhook for a list/audience.",
  },
  inputs: getWebhookInputs,
  examplePayload: getWebhookExamplePayload,
  perform: async (_context, { connection, listId, webhookId }) => {
    const webhook = await getWebhook(connection, listId, webhookId);
    return { data: webhook };
  },
});
