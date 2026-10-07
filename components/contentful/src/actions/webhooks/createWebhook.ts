import { action, outputSchema } from "@prismatic-io/spectral";
import type { Space, WebhookProps } from "contentful-management";
import { createClient } from "../../client";
import { createWebhookExamplePayload } from "../../examplePayloads";
import { createWebhookInputs } from "../../inputs";
import { createWebhookOutputSchema } from "../../outputSchemas";
export const createWebhook = action({
  display: {
    label: "Create Webhook",
    description: "Creates a new webhook.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, spaceId, name, url, topics }) => {
    const client = createClient(connection, context);
    const space: Space = await client.getSpace(spaceId);
    const data: WebhookProps = (
      await space.createWebhook({
        url,
        name,
        topics: topics ?? [],
      })
    ).toPlainObject();
    return {
      data,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => createWebhookExamplePayload,
  inputs: createWebhookInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createWebhookOutputSchema,
  }),
  examplePayload: createWebhookExamplePayload,
});
