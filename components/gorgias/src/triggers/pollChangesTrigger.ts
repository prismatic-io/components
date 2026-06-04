import { pollingTrigger } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { pollChangesInputs } from "../inputs/polling";
import { RESOURCE_CONFIG } from "../constants";
import type {
  CreateApiPaginationResponse,
  GorgiasRecord,
  PollingState,
} from "../types";
import { fetchAllWithPagination } from "../utils/fetchAllWithPagination";
import { filterByTimestamp } from "../utils/filterByTimestamp";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description:
      "Checks for new and updated records in a selected Gorgias resource type on a configured schedule.",
  },
  inputs: pollChangesInputs,
  async perform(context, payload, params) {
    const config = RESOURCE_CONFIG[params.pollResourceType];
    if (!config) {
      throw new Error(`Unsupported resource type: ${params.pollResourceType}`);
    }

    const now = new Date().toISOString();
    const state = context.polling.getState() as PollingState;
    const lastPolledAt = state?.lastPolledAt ?? now;

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
      params.showNewRecords,
      params.showUpdatedRecords,
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
