import { dataSource, type Element } from "@prismatic-io/spectral";
import { connectionInput, listId } from "../inputs";
import type { MailchimpWebhook } from "../types";
import { listWebhooks } from "../utils/webhooks";

export const selectWebhook = dataSource({
  display: {
    label: "Select Webhook",
    description:
      "Select a webhook configured for a specific Mailchimp list/audience.",
  },
  inputs: {
    connection: connectionInput,
    listId: { ...listId, dataSource: undefined },
  },
  perform: async (_context, { connection, listId }) => {
    const webhooks = await listWebhooks(connection, listId);

    const result = (webhooks as MailchimpWebhook[])
      .map<Element>((webhook) => ({
        label: webhook.url,
        key: webhook.id.toString(),
      }))
      .sort((a, b) => (a.label < b.label ? -1 : 1));

    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      {
        label: "https://example.com/webhook",
        key: "f4c8b5d2e3",
      },
    ],
  },
});

export default selectWebhook;
