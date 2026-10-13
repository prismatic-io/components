import { pollingTrigger } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { DEFAULT_BATCH_SIZE, REST_RESOURCE_CONFIG } from "../constants";
import { pollRecordsExamplePayload } from "../examplePayloads/triggers";
import { pollRecordsInputs } from "../inputs/triggers";
import type {
  HcmRestChangesObject,
  HcmRestRecordChange,
  PollingState,
} from "../types";
import { fetchRecordsSince, resolveRestPollingRecordChanges } from "../util";
export const pollRecordsTrigger = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description:
      "Retrieves existing and ongoing records in a selected Oracle HCM resource type. Load history once, check for changes on a schedule, or both.",
  },
  allowsBranching: false,
  examplePayload: pollRecordsExamplePayload,
  inputs: pollRecordsInputs,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: DEFAULT_BATCH_SIZE },
  triggerResolver: {
    resolveItems: (_context, { payload }): HcmRestRecordChange[] =>
      resolveRestPollingRecordChanges(
        payload.body.data as HcmRestChangesObject,
      ),
  },
  perform: async (context, payload, params) => {
    const now = new Date().toISOString();
    const pollState = context.polling.getState() as PollingState;
    const lastPolledAt =
      pollState?.lastPolledAt ?? (params.lookBackDate || now);
    const resourceConfig = REST_RESOURCE_CONFIG[params.resourceType];
    if (!resourceConfig) {
      throw new Error(`Unknown resource type: ${params.resourceType}`);
    }
    const client = createClient(params.connection, context.debug.enabled);
    const records = await fetchRecordsSince(
      client,
      resourceConfig.endpoint,
      lastPolledAt,
      params.pageSize,
    );
    context.polling.setState({ lastPolledAt: now });
    if (context.debug.enabled) {
      context.logger.debug(
        `Polled '${params.resourceType}': ${records.length} records updated since ${lastPolledAt}`,
      );
    }
    return {
      payload: {
        ...payload,
        body: { data: { records, resourceType: params.resourceType } },
      } as typeof payload,
      polledNoChanges: records.length === 0,
    };
  },
});
