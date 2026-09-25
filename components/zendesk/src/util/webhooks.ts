import type { FetchWebhooksInput, ZendeskWebhook } from "../types";
export const fetchWebhooks = async ({
  client,
  showOnlyInstanceWebhooks,
  instanceWebhookUrls,
}: FetchWebhooksInput): Promise<ZendeskWebhook[]> => {
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
