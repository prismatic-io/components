import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";

export interface ZendeskWebhook {
  id: string;
  name: string;
  description: string;
  status: string;
  subscriptions: string[];
  created_at: string;
  created_by: number;
  endpoint: string;
  http_method: string;
  request_format: string;
}

interface FetchWebhooksInput {
  client: HttpClient;
  showOnlyInstanceWebhooks: boolean;
  instanceWebhookUrls: string[];
}

export const fetchWebhooks = async ({
  client,
  showOnlyInstanceWebhooks,
  instanceWebhookUrls,
}: FetchWebhooksInput) => {
  let webhooks: ZendeskWebhook[] = [];
  let after = null;
  let hasMore = false;
  do {
    const { data } = await client.get("/webhooks", {
      params: { "page[after]": after },
    });
    webhooks = [...webhooks, ...data.webhooks];
    hasMore = data.meta?.has_more;
    after = data.meta?.after_cursor;
  } while (hasMore);
  if (showOnlyInstanceWebhooks) {
    return webhooks.filter((webhook) =>
      instanceWebhookUrls.includes(webhook.endpoint),
    );
  }
  return webhooks;
};
