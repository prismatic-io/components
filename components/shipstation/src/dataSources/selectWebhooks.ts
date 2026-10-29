import { dataSource, util } from "@prismatic-io/spectral";
import { createShipStationClient } from "../client";
import { selectWebhooksInputs } from "../inputs";
import type { Webhook } from "../types";

export const selectWebhooks = dataSource({
  dataSourceType: "picklist",
  display: {
    label: "Select Webhook",
    description:
      "A picklist of registered webhooks in the ShipStation account.",
  },
  inputs: selectWebhooksInputs,
  perform: async (_context, { connectionInput }) => {
    const client = createShipStationClient(connectionInput);

    const { data } = await client.get("/webhooks");
    const webhooks = data.webhooks || data;

    return {
      result: (webhooks as Webhook[])
        .map((webhook) => ({
          key: util.types.toString(webhook.id),
          label: `${webhook.event} → ${webhook.target_url}`,
        }))
        .sort((a, b) => (a.label < b.label ? -1 : 1)),
    };
  },
  examplePayload: {
    result: [
      {
        label: "ORDER_NOTIFY → https://example.com/webhook",
        key: "12345",
      },
    ],
  },
});
