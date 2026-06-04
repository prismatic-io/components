import { pollingTrigger, util } from "@prismatic-io/spectral";
import { getZendeskClient } from "../client";
import { POLL_RESOURCE_CONFIG } from "../constants";
import { pollChangesTriggerInputs } from "../inputs/triggers";
import type { PollingState, ZendeskSellRecord } from "../types";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description:
      "Checks for new and updated records in a selected Zendesk Sell resource type on a configured schedule.",
  },
  inputs: pollChangesTriggerInputs,
  perform: async (context, payload, params) => {
    const now = new Date().toISOString();

    const pollState = context.polling.getState() as PollingState | null;
    const lastPolledAt = pollState?.lastPolledAt ?? now;

    const resource = util.types.toString(params.pollResourceType);
    const endpoint = POLL_RESOURCE_CONFIG[resource]?.endpoint;

    if (context.debug.enabled) {
      context.logger.debug(
        `Polling Zendesk Sell ${resource} for changes from: ${lastPolledAt} to ${now}`,
      );
    }

    const client = getZendeskClient(params.connection, context.debug.enabled);

    const allRecords: ZendeskSellRecord[] = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const { data: responseData } = await client.get(endpoint, {
        params: { page, per_page: 100 },
        headers: { Accept: "application/json" },
      });

      const items: { data: ZendeskSellRecord }[] = responseData.items || [];
      for (const item of items) {
        allRecords.push(item.data);
      }

      hasMore = responseData.meta?.links?.next_page != null;
      page += 1;
    }

    const lastPolledDate = new Date(lastPolledAt);

    const created = allRecords.filter(
      (record) => new Date(record.created_at) > lastPolledDate,
    );

    const updated = allRecords.filter(
      (record) =>
        new Date(record.updated_at) > lastPolledDate &&
        new Date(record.created_at) <= lastPolledDate,
    );

    const filteredCreated = params.showNewRecords ? created : [];
    const filteredUpdated = params.showUpdatedRecords ? updated : [];

    context.polling.setState({ lastPolledAt: now });

    const totalChanges = filteredCreated.length + filteredUpdated.length;

    return {
      payload: {
        ...payload,
        body: {
          data: {
            created: filteredCreated,
            updated: filteredUpdated,
          },
        },
      },
      polledNoChanges: totalChanges === 0,
    };
  },
});
