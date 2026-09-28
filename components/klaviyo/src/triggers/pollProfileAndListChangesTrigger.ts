import { pollingTrigger } from "@prismatic-io/spectral";
import {
  KLAVIYO_FILTER_OPS,
  POLL_BATCH_SIZE,
  PROFILE_OR_LIST_RESOURCE_CONFIG,
} from "../constants";
import { pollProfileAndListChangesTriggerExamplePayload } from "../examplePayloads";
import { pollProfileAndListChangesInputs } from "../inputs";
import type {
  KlaviyoPollableResource,
  PollingChangesObject,
  PollingState,
} from "../types";
import {
  fetchProfileOrListRecords,
  filterByTimestamp,
  resolvePollingRecordChanges,
} from "../util";
export const pollProfileAndListChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Profiles and Lists",
    description:
      "Retrieves existing and ongoing profiles and lists in Klaviyo. Load history once, check for changes on a schedule, or both.",
  },
  examplePayload: pollProfileAndListChangesTriggerExamplePayload,
  inputs: pollProfileAndListChangesInputs,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: POLL_BATCH_SIZE },
  triggerResolver: {
    resolveItems: (_context, { payload }) =>
      resolvePollingRecordChanges(payload.body.data as PollingChangesObject),
  },
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
