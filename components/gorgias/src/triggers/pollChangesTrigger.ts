import { pollingTrigger } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { DEFAULT_BATCH_SIZE, RESOURCE_CONFIG } from "../constants";
import { pollChangesInputs } from "../inputs/polling";
import type {
  CreateApiPaginationResponse,
  GorgiasRecord,
  PollingChangesObject,
  PollingRecordChange,
  PollingState,
} from "../types";
import { fetchAllWithPagination } from "../utils/fetchAllWithPagination";
import { filterByTimestamp } from "../utils/filterByTimestamp";
import { resolvePollingRecordChanges } from "../utils/resolvePollingRecordChanges";
import { resolvePollWindow } from "../utils/resolvePollWindow";
export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description:
      "Retrieves existing and ongoing records for a specified Gorgias resource type. Load history once, check for changes on a schedule, or both.",
  },
  inputs: pollChangesInputs,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: DEFAULT_BATCH_SIZE },
  triggerResolver: {
    resolveItems: (_context, { payload }): PollingRecordChange[] =>
      resolvePollingRecordChanges(payload.body.data as PollingChangesObject),
  },
  async perform(context, payload, params) {
    const config = RESOURCE_CONFIG[params.pollResourceType];
    if (!config) {
      throw new Error(`Unsupported resource type: ${params.pollResourceType}`);
    }
    const now = new Date().toISOString();
    const state = context.polling.getState() as PollingState;
    const { lastPolledAt, isBackfill } = resolvePollWindow(
      state,
      params.lookBackDate,
      now,
    );
    const client = createClient({
      connection: params.connection,
      debug: context.debug.enabled,
    });
    const { data } = await fetchAllWithPagination<
      CreateApiPaginationResponse<GorgiasRecord>
    >({
      client,
      configVars: {},
      endpoint: config.endpoint,
    });
    const allRecords = data.data as GorgiasRecord[];
    const { created, updated } = filterByTimestamp(
      allRecords,
      lastPolledAt,
      isBackfill || params.showNewRecords,
      isBackfill || params.showUpdatedRecords,
    );
    const totalMatched = created.length + updated.length;
    context.logger.debug(
      `Polled ${allRecords.length} ${params.pollResourceType} records, ${created.length} created and ${updated.length} updated since last poll.`,
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
