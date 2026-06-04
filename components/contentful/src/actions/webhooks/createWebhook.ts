import { action } from "@prismatic-io/spectral";
import type { Space, WebhookProps } from "contentful-management";
import { createClient } from "../../client";
import { createWebhookExamplePayload } from "../../examplePayloads";
import { createWebhookInputs } from "../../inputs";

export const createWebhook = action({
  display: {
    label: "Create Webhook",
    description: "Creates a new webhook.",
  },
  perform: async (context, { connection, spaceId, name, url, topics }) => {
    const client = createClient(connection, context);
    const space: Space = await client.getSpace(spaceId);
    const data: WebhookProps = (
      await space.createWebhook({
        url,
        name,
        topics,
      })
    ).toPlainObject();
    return {
      data,
    };
  },
  inputs: createWebhookInputs,
  examplePayload: { data: createWebhookExamplePayload },
});
