import { pollingTrigger } from "@prismatic-io/spectral";
import {
  CAMPAIGN_RESOURCE_CONFIG,
  KLAVIYO_FILTER_FIELDS,
  KLAVIYO_FILTER_OPS,
  POLL_BATCH_SIZE,
} from "../constants";
import { pollCampaignChangesTriggerExamplePayload } from "../examplePayloads";
import { pollCampaignChangesInputs } from "../inputs";
import type { PollingChangesObject, PollingState } from "../types";
import {
  fetchCampaignRecords,
  filterByTimestamp,
  resolvePollingRecordChanges,
} from "../util";
export const pollCampaignChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Campaigns",
    description:
      "Retrieves existing and ongoing campaigns for a specified Klaviyo message channel. Load history once, check for changes on a schedule, or both.",
  },
  examplePayload: pollCampaignChangesTriggerExamplePayload,
  inputs: pollCampaignChangesInputs,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: POLL_BATCH_SIZE },
  triggerResolver: {
    resolveItems: (_context, { payload }) =>
      resolvePollingRecordChanges(payload.body.data as PollingChangesObject),
  },
  async perform(context, payload, params) {
    const now = new Date().toISOString();
    const state = context.polling.getState() as PollingState;
    const lastPolledAt =
      state?.lastPolledAt ??
      (params.lookBackDate
        ? new Date(`${params.lookBackDate}T00:00:00Z`).toISOString()
        : now);
    if (!params.showNewRecords && !params.showUpdatedRecords) {
      context.polling.setState({ lastPolledAt: now });
      return {
        payload: { ...payload, body: { data: { created: [], updated: [] } } },
        polledNoChanges: true,
      };
    }
    const filter = `${KLAVIYO_FILTER_OPS.AND}(${KLAVIYO_FILTER_OPS.EQUALS}(${KLAVIYO_FILTER_FIELDS.MESSAGES_CHANNEL},'${params.pollMessageChannel}'),${KLAVIYO_FILTER_OPS.GREATER_THAN}(${CAMPAIGN_RESOURCE_CONFIG.updatedAtField},${lastPolledAt}))`;
    const allRecords = await fetchCampaignRecords(params.connection, filter);
    const { created, updated } = filterByTimestamp(
      allRecords,
      lastPolledAt,
      CAMPAIGN_RESOURCE_CONFIG.createdAtAttr ??
        CAMPAIGN_RESOURCE_CONFIG.createdAtField,
      CAMPAIGN_RESOURCE_CONFIG.updatedAtAttr ??
        CAMPAIGN_RESOURCE_CONFIG.updatedAtField,
      params.showNewRecords,
      params.showUpdatedRecords,
    );
    const totalMatched = created.length + updated.length;
    context.logger.debug(
      `Polled ${allRecords.length} ${params.pollMessageChannel} campaigns (server-side filtered), ${created.length} new and ${updated.length} updated since last poll.`,
    );
    context.polling.setState({ lastPolledAt: now });
    return {
      payload: {
        ...payload,
        body: {
          data: { created, updated },
        },
      },
      polledNoChanges: totalMatched === 0,
    };
  },
});
