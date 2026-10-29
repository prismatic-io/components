import { pollingTrigger } from "@prismatic-io/spectral";
import { createAnalyticsClient } from "../client";
import { DEFAULT_BATCH_SIZE, POLL_RESOURCE_KEYS } from "../constants";
import { pollChangesTriggerExamplePayload } from "../examplePayloads";
import { pollChangesInputs } from "../inputs";
import type {
  Account,
  GA4ChangesObject,
  GA4Record,
  GA4RecordChange,
  PollingState,
  Property,
} from "../types";
import {
  filterByTimestamp,
  paginateRecords,
  resolvePollingRecordChanges,
} from "../util";
export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description:
      "Retrieves existing and ongoing records in Google Analytics GA4. Load history once, check for changes on a schedule, or both.",
  },
  inputs: pollChangesInputs,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: DEFAULT_BATCH_SIZE },
  triggerResolver: {
    resolveItems: (_context, { payload }): GA4RecordChange[] =>
      resolvePollingRecordChanges(payload.body.data as GA4ChangesObject),
  },
  perform: async (context, payload, params) => {
    const now = new Date().toISOString();
    const state = context.polling.getState() as PollingState;
    const isBackfill = !state?.lastPolledAt && Boolean(params.lookBackDate);
    const lastPolledAt = state?.lastPolledAt ?? (params.lookBackDate || now);
    const client = createAnalyticsClient({
      connection: params.connection,
      endpointType: "adminv1beta",
      debug: context.debug.enabled,
    });
    let allRecords: GA4Record[];
    if (params.pollResourceType === POLL_RESOURCE_KEYS.ACCOUNTS) {
      const response = await paginateRecords<Account, "accounts">(
        client,
        "/accounts",
        { pageSize: 200 },
        true,
        "accounts",
      );
      allRecords = response.accounts;
    } else if (params.pollResourceType === POLL_RESOURCE_KEYS.PROPERTIES) {
      if (!params.accountId) {
        throw new Error(
          "Account ID is required when polling Properties. Select an account in the trigger configuration.",
        );
      }
      const response = await paginateRecords<Property, "properties">(
        client,
        "/properties",
        { pageSize: 200, filter: `parent:${params.accountId}` },
        true,
        "properties",
      );
      allRecords = response.properties;
    } else {
      throw new Error(`Unsupported resource type: ${params.pollResourceType}`);
    }
    const { created, updated } = filterByTimestamp(
      allRecords,
      lastPolledAt,
      isBackfill,
      params.showNewRecords,
      params.showUpdatedRecords,
    );
    const totalMatched = created.length + updated.length;
    if (context.debug.enabled) {
      context.logger.debug(
        `Polled ${allRecords.length} ${params.pollResourceType} records, ${created.length} created, ${updated.length} updated since last poll.`,
      );
    }
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
  examplePayload: pollChangesTriggerExamplePayload,
});
