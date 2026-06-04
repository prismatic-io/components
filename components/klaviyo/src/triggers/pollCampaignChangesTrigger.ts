import { pollingTrigger } from "@prismatic-io/spectral";
import {
  CAMPAIGN_RESOURCE_CONFIG,
  KLAVIYO_FILTER_FIELDS,
  KLAVIYO_FILTER_OPS,
} from "../constants";
import { pollCampaignChangesInputs } from "../inputs/polling";
import type { PollingState } from "../types/polling";
import { fetchCampaignRecords, filterByTimestamp } from "../utils";

export const pollCampaignChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Campaigns",
    description:
      "Checks for new and updated campaigns in Klaviyo on a configured schedule.",
  },
  inputs: pollCampaignChangesInputs,
  async perform(context, payload, params) {
    const now = new Date().toISOString();
    const state = context.polling.getState() as PollingState;
    const lastPolledAt = state?.lastPolledAt ?? now;

    
    
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
      CAMPAIGN_RESOURCE_CONFIG.createdAtField,
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
