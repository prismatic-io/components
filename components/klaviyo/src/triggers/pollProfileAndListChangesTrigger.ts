import { pollingTrigger } from "@prismatic-io/spectral";
import { KLAVIYO_FILTER_OPS, PROFILE_OR_LIST_RESOURCE_CONFIG } from "../constants";
import { pollProfileAndListChangesInputs } from "../inputs/polling";
import type { KlaviyoPollableResource, PollingState } from "../types/polling";
import { fetchProfileOrListRecords, filterByTimestamp } from "../utils";

export const pollProfileAndListChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Profiles and Lists",
    description:
      "Checks for new and updated profiles and lists in Klaviyo on a configured schedule.",
  },
  inputs: pollProfileAndListChangesInputs,
  async perform(context, payload, params) {
    const config =
      PROFILE_OR_LIST_RESOURCE_CONFIG[params.pollProfileOrListResourceType];
    if (!config) {
      throw new Error(
        `Unsupported resource type: ${params.pollProfileOrListResourceType}`,
      );
    }

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

    
    
    
    
    const filter = `${KLAVIYO_FILTER_OPS.GREATER_THAN}(${config.updatedAtField},${lastPolledAt})`;

    const allRecords = await fetchProfileOrListRecords(
      params.connection,
      params.pollProfileOrListResourceType as KlaviyoPollableResource,
      filter,
    );

    const { created, updated } = filterByTimestamp(
      allRecords,
      lastPolledAt,
      config.createdAtField,
      config.updatedAtField,
      params.showNewRecords,
      params.showUpdatedRecords,
    );

    const totalMatched = created.length + updated.length;

    context.logger.debug(
      `Polled ${allRecords.length} ${params.pollProfileOrListResourceType} records (server-side filtered), ${created.length} new and ${updated.length} updated since last poll.`,
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
