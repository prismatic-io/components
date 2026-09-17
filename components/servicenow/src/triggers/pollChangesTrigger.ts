import { pollingTrigger } from "@prismatic-io/spectral";
import { DEFAULT_BATCH_SIZE } from "../constants";
import { pollChangesTriggerExamplePayload } from "../examplePayloads";
import { pollChangesTriggerInputs } from "../inputs";
import type {
  ChangeRecord,
  PollingChangesObject,
  PollingRecordChange,
  PollingState,
} from "../types";
import { getTable, resolvePollingRecordChanges } from "../util";
export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description:
      "Retrieves existing and ongoing records for a specified ServiceNow table. Load history once, check for changes on a schedule, or both.",
  },
  inputs: pollChangesTriggerInputs,
  examplePayload: pollChangesTriggerExamplePayload,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: DEFAULT_BATCH_SIZE },
  triggerResolver: {
    resolveItems: (_context, { payload }): PollingRecordChange[] =>
      resolvePollingRecordChanges(payload.body.data as PollingChangesObject),
  },
  perform: async (context, payload, params) => {
    const now = new Date().toISOString();
    const pollState = context.polling.getState() as unknown as PollingState;
    const isBackfill = !pollState?.lastPolledAt && Boolean(params.lookBackDate);
    const lastPolledAt: string =
      pollState?.lastPolledAt || params.lookBackDate || now;
    context.logger.debug(
      `Polling ServiceNow table '${params.tableNameInput}' for changes from ${lastPolledAt} to ${now}${isBackfill ? " (initial sync)" : ""}`,
    );
    const sysparmQuery = `sys_updated_on${isBackfill ? ">=" : ">"}${lastPolledAt}^ORDERBYsys_updated_on`;
    const records = (await getTable({
      connection: params.connection,
      tableName: params.tableNameInput,
      apiVersion: params.apiVersionInput,
      instanceUrl: params.instanceUrlInput,
      queryParameters: {
        sysparm_query: sysparmQuery,
      },
      debug: false,
    })) as ChangeRecord[];
    const allRecords: ChangeRecord[] = Array.isArray(records) ? records : [];
    const lastPolledDate = new Date(lastPolledAt);
    const changedSince = (timestamp: string): boolean =>
      isBackfill
        ? new Date(timestamp) >= lastPolledDate
        : new Date(timestamp) > lastPolledDate;
    const created = allRecords.filter((record) =>
      changedSince(record.sys_created_on),
    );
    const updated = allRecords.filter(
      (record) =>
        changedSince(record.sys_updated_on) &&
        !changedSince(record.sys_created_on),
    );
    const filteredCreated = isBackfill || params.showNewRecords ? created : [];
    const filteredUpdated =
      isBackfill || params.showUpdatedRecords ? updated : [];
    context.polling.setState({ lastPolledAt: now });
    const totalChanges = filteredCreated.length + filteredUpdated.length;
    return {
      payload: {
        ...payload,
        body: {
          data: {
            created: filteredCreated,
            updated: filteredUpdated,
          },
        },
      },
      polledNoChanges: totalChanges === 0,
    };
  },
});
