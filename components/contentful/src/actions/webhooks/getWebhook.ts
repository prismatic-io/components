import { action, outputSchema } from "@prismatic-io/spectral";
import type { Space, WebhookProps } from "contentful-management";
import { createClient } from "../../client";
import { getWebhookExamplePayload } from "../../examplePayloads";
import { getWebhookInputs } from "../../inputs";
import { getWebhookOutputSchema } from "../../outputSchemas";
export const getWebhook = action({
  display: {
    label: "Get Webhook",
    description: "Retrieves a single webhook by ID.",
  },
  performSafety: "safe",
  perform: async (context, { connection, spaceId, webhookId }) => {
    const client = createClient(connection, context);
    const space: Space = await client.getSpace(spaceId);
    const data: WebhookProps = (
      await space.getWebhook(webhookId)
    ).toPlainObject();
    return {
      data,
    };
  },
  inputs: getWebhookInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getWebhookOutputSchema,
  }),
  examplePayload: getWebhookExamplePayload,
});
