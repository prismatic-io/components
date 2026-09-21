import { pollingTrigger } from "@prismatic-io/spectral";
import { DEFAULT_BATCH_SIZE, POLL_RESOURCE_CONFIG } from "../constants";
import { pollChangesTriggerExamplePayload } from "../examplePayloads";
import { pollChangesInputs } from "../inputs";
import type {
  PollingChangesObject,
  PollingRecordChange,
  PollingState,
  SageIntacctRecord,
} from "../types";
import {
  filterByTimestamp,
  queryRecordsPaginated,
  resolvePollingRecordChanges,
} from "../util";
export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description:
      "Retrieves existing and ongoing records for a selected Sage Intacct object type. Load history once, check for changes on a schedule, or both.",
  },
  inputs: pollChangesInputs,
  examplePayload: pollChangesTriggerExamplePayload,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: DEFAULT_BATCH_SIZE },
  triggerResolver: {
    resolveItems: (_context, { payload }): PollingRecordChange[] =>
      resolvePollingRecordChanges(payload.body.data as PollingChangesObject),
  },
  async perform(context, payload, params) {
    const config = POLL_RESOURCE_CONFIG[params.pollResourceType];
    if (!config) {
      throw new Error(`Unsupported resource type: ${params.pollResourceType}`);
    }
    const now = new Date().toISOString();
    const state = context.polling.getState() as PollingState;
    const lastPolledAt = state?.lastPolledAt ?? (params.lookBackDate || now);
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
