import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connectionInput, version } from "../inputs";

interface Webhook {
  id: number;
  topic: string;
  subscription_url: string;
}

export const selectWebhook = dataSource({
  display: {
    label: "Select Webhook",
    description: "Select a webhook from your ShipBob account.",
  },
  inputs: {
    connection: connectionInput,
    version,
  },
  perform: async (_context, { connection, version }) => {
    const client = createClient(connection, version, false);
    const { data } = await client.get<Webhook[]>("/webhook");
    return {
      result: data
        .map<Element>((webhook) => ({
          label: `${webhook.topic} - ${webhook.subscription_url}`,
          key: webhook.id.toString(),
        }))
        .sort((a, b) => (a.label < b.label ? -1 : 1)),
    };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      { label: "order_shipped - https://example.com/webhook", key: "12345" },
      {
        label: "shipment_delivered - https://example.com/webhook2",
        key: "67890",
      },
    ],
  },
});
