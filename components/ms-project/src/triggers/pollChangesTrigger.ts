import { pollingTrigger } from "@prismatic-io/spectral";
import { createProjectsClient } from "../client";
import {
  CREATED_AT_FIELD,
  DEFAULT_BATCH_SIZE,
  PROJECTS_ENDPOINT,
  UPDATED_AT_FIELD,
} from "../constants";
import { buildPollingFilter, resolvePollingRecordChanges } from "../helper";
import { pollChangesInputs } from "../inputs/polling";
import type {
  MsProjectChangesObject,
  MsProjectListResponse,
  MsProjectRecord,
  MsProjectRecordChange,
  PollingState,
} from "../types";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Projects",
    description:
      "Retrieves existing and ongoing projects from Microsoft Project. Load history once, check for changes on a schedule, or both.",
  },
  inputs: pollChangesInputs,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: DEFAULT_BATCH_SIZE },
  triggerResolver: {
    resolveItems: (_context, { payload }): MsProjectRecordChange[] =>
      resolvePollingRecordChanges(payload.body.data as MsProjectChangesObject),
  },
  async perform(context, payload, params) {
    const now = new Date().toISOString();
    const state = context.polling.getState() as PollingState;

    const isInitialSync = !state?.lastPolledAt && Boolean(params.lookBackDate);
    const lastPolledAt =
      state?.lastPolledAt ??
      (params.lookBackDate ? new Date(params.lookBackDate).toISOString() : now);

    if (
      !params.showNewRecords &&
      !params.showUpdatedRecords &&
      !isInitialSync
    ) {
      context.polling.setState({ lastPolledAt: now });
      return {
        payload: { ...payload, body: { data: { created: [], updated: [] } } },
        polledNoChanges: true,
      };
    }

    const client = createProjectsClient(
      { connection: params.connection },
      context.debug.enabled,
    );

    const filter = buildPollingFilter(
      CREATED_AT_FIELD,
      UPDATED_AT_FIELD,
      lastPolledAt,
      isInitialSync || params.showNewRecords,
      isInitialSync || params.showUpdatedRecords,
    );

    const { data } = await client.get<MsProjectListResponse<MsProjectRecord>>(
      PROJECTS_ENDPOINT,
      {
        params: filter ? { $filter: filter } : undefined,
      },
    );

    const records: MsProjectRecord[] =
      data?.d?.results ?? data?.value ?? data?.results ?? [];

    const lastPolledAtDate = new Date(lastPolledAt);
    const created: MsProjectRecord[] = [];
    const updated: MsProjectRecord[] = [];

    for (const record of records) {
      const createdValue = record.CreatedDate;
      const updatedValue = record.LastPublishedDate;
      const createdAtDate =
        typeof createdValue === "string" ? new Date(createdValue) : null;
      const updatedAtDate =
        typeof updatedValue === "string" ? new Date(updatedValue) : null;

      const isNew = createdAtDate !== null && createdAtDate > lastPolledAtDate;
      const isUpdated =
        !isNew && updatedAtDate !== null && updatedAtDate > lastPolledAtDate;

      if (isNew && (isInitialSync || params.showNewRecords))
        created.push(record);
      else if (isUpdated && (isInitialSync || params.showUpdatedRecords))
        updated.push(record);
    }

    const totalMatched = created.length + updated.length;

    context.logger.debug(
      `Polled projects with $filter="${filter ?? ""}", received ${records.length} records since last poll (created: ${created.length}, updated: ${updated.length}).`,
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
