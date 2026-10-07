import { action, outputSchema } from "@prismatic-io/spectral";
import type {
  CollectionProp,
  Space,
  WebhookProps,
} from "contentful-management";
import { createClient } from "../../client";
import { listWebhooksExamplePayload } from "../../examplePayloads";
import { listWebhooksInputs } from "../../inputs";
import { listWebhooksOutputSchema } from "../../outputSchemas";
export const listWebhooks = action({
  display: {
    label: "List Webhooks",
    description: "Retrieves all webhooks of a space.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, spaceId }) => {
    const client = createClient(connection, context);
    const space: Space = await client.getSpace(spaceId);
    const data: CollectionProp<WebhookProps> = (
      await space.getWebhooks()
    ).toPlainObject();
    const items = data.items;
    return {
      data: items,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => listWebhooksExamplePayload,
  inputs: listWebhooksInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listWebhooksOutputSchema,
  }),
  examplePayload: listWebhooksExamplePayload,
});
