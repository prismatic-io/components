import { pollingTrigger } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { POLL_RESOURCE_CONFIG } from "../constants";
import { connection } from "../inputs/general";
import { pollChangesInputs } from "../inputs/polling";
import type { PollingState, SAPBusinessOneRecord } from "../types";
import { fetchAllData, filterByTimestamp, toSapB1DateFilter } from "../util";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description: "Checks for new and updated records in SAP Business One on a configured schedule.",
  },
  inputs: {
    connection,
    ...pollChangesInputs,
  },
  perform: async (context, payload, params) => {
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

    
    
    
    const client = await createClient(params.connection, context, context.debug.enabled);

    
    
    
    const lastPolledDay = toSapB1DateFilter(lastPolledAt);
    const allRecords = (await fetchAllData(
      client,
      config.endpoint,
      { $filter: `${config.updatedField} ge '${lastPolledDay}'` },
      true,
    )) as SAPBusinessOneRecord[];

    const { created: allCreated, updated: allUpdated } = filterByTimestamp(
      allRecords,
      config,
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
