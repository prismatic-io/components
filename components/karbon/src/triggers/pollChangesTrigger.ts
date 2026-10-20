import { pollingTrigger } from "@prismatic-io/spectral";
import { createKarbonClient } from "../client";
import { DEFAULT_BATCH_SIZE, POLL_RESOURCE_CONFIG } from "../constants";
import pollChangesInputs from "../inputs/triggers/pollChanges";
import type { PollingState } from "../interfaces/PollingState";
import type { KarbonChangesObject, KarbonRecordChange } from "../util/polling";
import { resolvePollingRecordChanges } from "../util/polling";
import { filterRecordsModifiedAfter, getPaginatedData } from "../utils";
export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "Updated Records",
    description:
      "Retrieves existing and ongoing updated records from Karbon. Load history once, check for changes on a schedule, or both.",
  },
  inputs: pollChangesInputs,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: DEFAULT_BATCH_SIZE },
  triggerResolver: {
    resolveItems: (_context, { payload }): KarbonRecordChange[] =>
      resolvePollingRecordChanges(payload.body.data as KarbonChangesObject),
  },
  perform: async (context, payload, params) => {
    const config = POLL_RESOURCE_CONFIG[params.pollResourceType];
    if (!config) {
      throw new Error(`Unsupported resource type: ${params.pollResourceType}`);
    }
    const pollState = context.polling.getState() as PollingState;
    const now = new Date().toISOString();
    const lastPolledAt =
      pollState?.lastPolledAt ??
      (params.lookBackDate ? new Date(params.lookBackDate).toISOString() : now);
    const client = createKarbonClient(params.connection, context.debug.enabled);
    const response = await getPaginatedData<Record<string, unknown>>({
      client,
      endpoint: config.endpoint,
      getAllData: true,
      pagination: {},
    });
    const records = filterRecordsModifiedAfter(
      response.value ?? [],
      config.timestampField,
      lastPolledAt,
    );
    context.polling.setState({ lastPolledAt: now });
    if (context.debug.enabled) {
      context.logger.debug(
        `Polled Karbon ${params.pollResourceType}: ${(response.value ?? []).length} fetched, ${records.length} changed`,
      );
    }
    return {
      payload: { ...payload, body: { data: { updated: records } } },
      polledNoChanges: records.length === 0,
    };
  },
});
