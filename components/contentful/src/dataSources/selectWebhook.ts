import { dataSource, type Element } from "@prismatic-io/spectral";
import type {
  CollectionProp,
  Space,
  WebhookProps,
} from "contentful-management";
import { createClient } from "../client";
import { selectWebhookExamplePayload } from "../examplePayloads";
import { selectWebhookInputs } from "../inputs";

export const selectWebhook = dataSource({
  display: {
    label: "Select Webhook",
    description: "Select a webhook from a dropdown menu.",
  },
  inputs: selectWebhookInputs,
  perform: async (_context, { connection, spaceId }) => {
    const client = createClient(connection);
    const space: Space = await client.getSpace(spaceId);

    const data: CollectionProp<WebhookProps> = (
      await space.getWebhooks()
    ).toPlainObject();

    const result: Element[] = data.items
      .map<Element>((item) => ({
        label: item.name,
        key: item.sys.id,
      }))
      .sort((a, b) => ((a.label ?? "") < (b.label ?? "") ? -1 : 1));

    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: selectWebhookExamplePayload,
});
