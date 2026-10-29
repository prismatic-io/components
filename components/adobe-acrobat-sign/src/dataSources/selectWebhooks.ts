import { dataSource } from "@prismatic-io/spectral";
import { selectWebhooksInputs } from "../inputs";
import { getAdobeSignClient } from "../client";
import type { WebhookResponse } from "../types";
import { fetchAdobeSignResults, filterAndSort } from "../util";

export const selectWebhooks = dataSource({
  display: {
    label: "Select Webhooks",
    description:
      "Retrieves a picklist of all Adobe Acrobat Sign webhooks under this account.",
  },
  dataSourceType: "picklist",
  inputs: selectWebhooksInputs,
  perform: async (
    _,
    { connection, filterQuery, scope, webhookResourceType },
  ) => {
    const client = getAdobeSignClient(connection);

    const webhooks = await fetchAdobeSignResults<
      WebhookResponse,
      "userWebhookList",
      true
    >(
      client,
      "/webhooks",
      true,
      {
        scope: scope || undefined,
        resourceType: webhookResourceType,
      },
      "userWebhookList",
    );

    const elements = webhooks.map((webhook) => ({
      label: `${webhook.name} - ${webhook.scope}`,
      key: webhook.id,
    }));

    return {
      result: filterAndSort(elements, filterQuery),
    };
  },
});
