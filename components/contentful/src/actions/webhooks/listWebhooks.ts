import { action } from "@prismatic-io/spectral";
import type {
  CollectionProp,
  Space,
  WebhookProps,
} from "contentful-management";
import { createClient } from "../../client";
import { listWebhooksExamplePayload } from "../../examplePayloads";
import { listWebhooksInputs } from "../../inputs";

export const listWebhooks = action({
  display: {
    label: "List Webhooks",
    description: "Retrieves all webhooks of a space.",
  },
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
  inputs: listWebhooksInputs,
  examplePayload: { data: listWebhooksExamplePayload },
});
