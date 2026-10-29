import { pollingTrigger, util } from "@prismatic-io/spectral";
import { getZendeskClient } from "../client";
import { POLL_RESOURCE_CONFIG } from "../constants";
import { pollChangesTriggerExamplePayload } from "../examplePayloads";
import { pollChangesTriggerInputs } from "../inputs/triggers";
import type {
  PollingState,
  ZendeskSellRecord,
  ZendeskSellRecordChange,
  ZendeskSellRecordChanges,
} from "../types";
import { resolvePollWindow, resolveZendeskSellRecordChanges } from "../util";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description:
      "Retrieves existing and ongoing records for a specified Zendesk Sell resource type. Load history once, check for changes on a schedule, or both.",
  },
  inputs: pollChangesTriggerInputs,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: 50 },
  triggerResolver: {
    resolveItems: (_context, { payload }): ZendeskSellRecordChange[] =>
      resolveZendeskSellRecordChanges(
        payload.body.data as ZendeskSellRecordChanges,
      ),
  },
  perform: async (context, payload, params) => {
    const now = new Date().toISOString();

    const pollState = context.polling.getState() as PollingState | null;
    const { lastPolledAt, includeNew, includeUpdated } = resolvePollWindow(
      pollState,
      params,
      now,
    );

    const resource = util.types.toString(params.pollResourceType);
    const endpoint = POLL_RESOURCE_CONFIG[resource]?.endpoint;

    if (!endpoint) {
      throw new Error(`Unsupported resource type: ${resource}`);
    }

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

    const filteredCreated = includeNew ? created : [];
    const filteredUpdated = includeUpdated ? updated : [];

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
  examplePayload: pollChangesTriggerExamplePayload,
});
