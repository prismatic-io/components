import { dataSource } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../client";
import { connectionInput } from "../inputs";
import { getAllWebhookEntries } from "../utils";
import type { Webhook } from "../interfaces";

export const selectWebhook = dataSource({
  display: {
    label: "Select Webhook",
    description: "Select webhook from Box account",
  },
  dataSourceType: "picklist",
  perform: async (context, { boxConnection }) => {
    const client = createAuthorizedClient({ boxConnection });

    const { entries } = await getAllWebhookEntries(client);
    const webhooks: Webhook[] = await Promise.all(
      (entries || []).map((entry) => client.webhooks.get(entry.id)),
    );

    return {
      result: (webhooks || []).map((webhook) => ({
        label: webhook.address,
        key: webhook.id,
      })),
    };
  },
  inputs: { boxConnection: connectionInput },
});
