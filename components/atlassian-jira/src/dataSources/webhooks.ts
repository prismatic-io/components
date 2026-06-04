import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createV3Client } from "../connections/auth";
import { connectionInput } from "../inputs";
import type { WebhookData } from "../types";
import { getPaginatedData, isBasicAuth } from "../util";

const selectWebhook = dataSource({
  display: {
    label: "Select Webhook",
    description: "Select a webhook.",
  },
  inputs: {
    jiraConnection: connectionInput,
  },
  perform: async (_context, { jiraConnection }) => {
    const useBasicAuth = isBasicAuth(jiraConnection);
    const client = await createV3Client(jiraConnection, false, useBasicAuth);
    const { data } = await getPaginatedData<WebhookData>(client, "/webhook", true, useBasicAuth);
    const webhooks = useBasicAuth ? (data as unknown as WebhookData[]) : data.values;
    const result = webhooks.map<Element>(({ events, id }) => ({
      label: events.join(", "),
      key: util.types.toString(id),
    }));
    return { result };
  },
  dataSourceType: "picklist",
});

export default {
  selectWebhook,
};
