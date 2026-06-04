import { pollingTrigger } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { POLL_RESOURCE_CONFIG } from "../constants";
import { connection } from "../inputs/general";
import { pollChangesInputs } from "../inputs/polling";
import type { PollingState, SAPSuccessFactorsRecord } from "../types";
import { filterByTimestamp, paginateData, toSapFilterDatetime } from "../util";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description:
      "Checks for new and updated records in a selected SAP SuccessFactors resource type on a configured schedule.",
  },
  inputs: {
    connection,
    ...pollChangesInputs,
  },
  async perform(context, payload, params) {
    const config = POLL_RESOURCE_CONFIG[params.pollResourceType];
    if (!config) {
      throw new Error(`Unsupported resource type: ${params.pollResourceType}`);
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

    const client = await createClient(params.connection, context.debug.enabled);

    
    
    const filter = `${config.timestampField} gt ${toSapFilterDatetime(lastPolledAt)}`;
    const results = await paginateData(client, config.endpoint, true, {
      $filter: filter,
    });
    const allRecords = (Array.isArray(results) ? results : [results]) as SAPSuccessFactorsRecord[];

    const { created: allCreated, updated: allUpdated } = filterByTimestamp(
      allRecords,
      lastPolledAt,
    );

    const created = params.showNewRecords ? allCreated : [];
    const updated = params.showUpdatedRecords ? allUpdated : [];
    const totalMatched = created.length + updated.length;

    if (context.debug.enabled) {
      context.logger.debug(
        `Polled ${allRecords.length} ${params.pollResourceType} records: ${created.length} created, ${updated.length} updated since last poll.`,
      );
    }

    context.polling.setState({ lastPolledAt: now });

    return {
      payload: { ...payload, body: { data: { created, updated } } },
      polledNoChanges: totalMatched === 0,
    };
  },
});
