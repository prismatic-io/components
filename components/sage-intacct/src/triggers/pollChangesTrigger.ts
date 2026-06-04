import { pollingTrigger } from "@prismatic-io/spectral";
import { POLL_RESOURCE_CONFIG } from "../constants";
import { pollChangesInputs } from "../inputs";
import type { PollingState, SageIntacctRecord } from "../types";
import { filterByTimestamp, queryRecordsPaginated } from "../utils";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description:
      "Checks for new and updated records in Sage Intacct on a configured schedule.",
  },
  inputs: pollChangesInputs,
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

    
    
    
    
    
    
    
    
    const query = `${config.objectName}.${config.timestampField} > '${lastPolledAt}'`;
    const records = (await queryRecordsPaginated(
      params.connection,
      config.objectName,
      [],
      query,
    )) as SageIntacctRecord[];

    const { created, updated } = filterByTimestamp(
      records,
      lastPolledAt,
      params.showNewRecords,
      params.showUpdatedRecords,
      config.createdField,
    );

    const totalMatched = created.length + updated.length;

    if (context.debug.enabled) {
      context.logger.debug(
        `Polled ${records.length} ${params.pollResourceType} records, ${totalMatched} matched since last poll (${created.length} new, ${updated.length} updated).`,
      );
    }

    context.polling.setState({ lastPolledAt: now });

    return {
      payload: { ...payload, body: { data: { created, updated } } },
      polledNoChanges: totalMatched === 0,
    };
  },
});
