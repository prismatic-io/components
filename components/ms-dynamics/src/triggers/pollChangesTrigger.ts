import { pollingTrigger } from "@prismatic-io/spectral";
import type { RetrieveMultipleRequest } from "dynamics-web-api";
import { createCrmClient } from "../client";
import { BATCH_SIZE } from "../constants";
import { pollChangesTriggerExamplePayload } from "../examplePayloads";
import { pollChangesInputs } from "../inputs";
import type {
  DynamicsChangesObject,
  DynamicsRecord,
  PollingState,
} from "../types";
import { paginateQueryEntities, resolvePollingRecordChanges } from "../util";
export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description:
      "Checks for new and updated records of a Microsoft Dynamics 365 entity type on a configured schedule.",
  },
  examplePayload: pollChangesTriggerExamplePayload,
  inputs: pollChangesInputs,
  perform: async (context, payload, params) => {
    const now = new Date().toISOString();
    const pollState = context.polling.getState() as PollingState;
    const lastPolledAt =
      pollState?.lastPolledAt ??
      (params.lookBackDate ? `${params.lookBackDate}T00:00:00Z` : now);
    const modifiedFilter = `modifiedon gt ${lastPolledAt}`;
    const filter = params.filterExpression
      ? `(${params.filterExpression}) and (${modifiedFilter})`
      : modifiedFilter;
    const request: RetrieveMultipleRequest = {
      collection: params.entityType,
      filter,
      orderBy: ["modifiedon asc"],
    };
    const client = await createCrmClient(
      params.connection,
      context.debug.enabled,
    );
    const retrieveFn = async (pageId?: string) => {
      const result = await client.retrieveMultiple(request, pageId);
      return result as unknown as Record<string, unknown>;
    };
    const { data } = await paginateQueryEntities(retrieveFn, true);
    const records = ((data as Record<string, unknown>)?.value ??
      []) as DynamicsRecord[];
    const lastPolledAtDate = new Date(lastPolledAt);
    const created: DynamicsRecord[] = [];
    const updated: DynamicsRecord[] = [];
    for (const record of records) {
      const createdAtDate =
        typeof record.createdon === "string"
          ? new Date(record.createdon)
          : null;
      const modifiedAtDate =
        typeof record.modifiedon === "string"
          ? new Date(record.modifiedon)
          : null;
      const isNew = createdAtDate !== null && createdAtDate > lastPolledAtDate;
      const isUpdated =
        !isNew &&
        (modifiedAtDate === null || modifiedAtDate > lastPolledAtDate);
      if (isNew && params.showNewRecords) created.push(record);
      else if (isUpdated && params.showUpdatedRecords) updated.push(record);
    }
    const totalMatched = created.length + updated.length;
    const maxModifiedOn = records.length
      ? records.reduce((max, r) => {
          const mod = typeof r.modifiedon === "string" ? r.modifiedon : "";
          return mod > max ? mod : max;
        }, "")
      : null;
    context.polling.setState({ lastPolledAt: maxModifiedOn ?? now });
    if (context.debug.enabled) {
      context.logger.debug(
        `Polled ${params.entityType}: ${records.length} fetched, ${created.length} created, ${updated.length} updated`,
      );
    }
    return {
      payload: { ...payload, body: { data: { created, updated } } },
      polledNoChanges: totalMatched === 0,
    };
  },
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: BATCH_SIZE },
  triggerResolver: {
    resolveItems: (_context, result) => {
      const data = result.payload.body.data as
        | DynamicsChangesObject
        | undefined;
      return resolvePollingRecordChanges(data);
    },
  },
});
