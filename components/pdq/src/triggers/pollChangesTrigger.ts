import { pollingTrigger } from "@prismatic-io/spectral";
import { createHttpClient } from "../client";
import { DEFAULT_BATCH_SIZE, POLL_RESOURCE_CONFIG } from "../constants";
import { pollChangesTriggerExamplePayload } from "../examplePayloads/triggers";
import { pollChangesInputs } from "../inputs";
import type { PdqChangesObject, PdqRecordChange, PollingState } from "../types";
import {
  fetchAllInsertedAfter,
  filterRecordsInsertedAfter,
  resolvePollingRecordChanges,
} from "../util";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New Records",
    description:
      "Retrieves existing and ongoing records for a specified PDQ resource type. Load history once, check for changes on a schedule, or both.",
  },
  inputs: pollChangesInputs,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: DEFAULT_BATCH_SIZE },
  triggerResolver: {
    resolveItems: (_context, { payload }): PdqRecordChange[] =>
      resolvePollingRecordChanges(payload.body.data as PdqChangesObject),
  },
  perform: async (context, payload, params) => {
    const config = POLL_RESOURCE_CONFIG[params.pollResourceType];
    if (!config) {
      throw new Error(`Unsupported resource type: ${params.pollResourceType}`);
    }

    const pollState = context.polling.getState() as PollingState;
    const now = new Date().toISOString();
    const isInitialSync = !pollState?.lastPolledAt;

    if (isInitialSync && !params.lookBackDate) {
      context.polling.setState({ lastPolledAt: now });
      return {
        payload: { ...payload, body: { data: { created: [] } } },
        polledNoChanges: true,
      };
    }

    const lastPolledAt =
      pollState?.lastPolledAt ?? (params.lookBackDate || now);
    const client = createHttpClient(params.connection, context.debug.enabled);

    const fetched = await fetchAllInsertedAfter(
      client,
      config.endpoint,
      lastPolledAt,
    );

    const records = filterRecordsInsertedAfter(fetched, lastPolledAt);

    context.polling.setState({ lastPolledAt: now });

    if (context.debug.enabled) {
      context.logger.debug(
        `Polled PDQ ${params.pollResourceType}: ${fetched.length} fetched, ${records.length} new`,
      );
    }

    return {
      payload: { ...payload, body: { data: { created: records } } },
      polledNoChanges: records.length === 0,
    };
  },
  examplePayload: pollChangesTriggerExamplePayload,
});
