import { pollingTrigger } from "@prismatic-io/spectral";
import { createProjectsClient } from "../client";
import { CREATED_AT_FIELD, PROJECTS_ENDPOINT, UPDATED_AT_FIELD } from "../constants";
import { buildPollingFilter } from "../helper";
import { pollChangesInputs } from "../inputs/polling";
import type { MsProjectListResponse, MsProjectRecord, PollingState } from "../types";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Projects",
    description:
      "Checks for new and updated projects in Microsoft Project on a configured schedule.",
  },
  inputs: pollChangesInputs,
  async perform(context, payload, params) {
    
    
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

    const client = createProjectsClient({ connection: params.connection }, context.debug.enabled);

    const filter = buildPollingFilter(
      CREATED_AT_FIELD,
      UPDATED_AT_FIELD,
      lastPolledAt,
      params.showNewRecords,
      params.showUpdatedRecords,
    );

    const { data } = await client.get<MsProjectListResponse<MsProjectRecord>>(PROJECTS_ENDPOINT, {
      params: filter ? { $filter: filter } : undefined,
    });

    
    
    const records: MsProjectRecord[] = data?.d?.results ?? data?.value ?? data?.results ?? [];

    const lastPolledAtDate = new Date(lastPolledAt);
    const created: MsProjectRecord[] = [];
    const updated: MsProjectRecord[] = [];

    for (const record of records) {
      const createdValue = record.CreatedDate;
      const updatedValue = record.LastPublishedDate;
      const createdAtDate = typeof createdValue === "string" ? new Date(createdValue) : null;
      const updatedAtDate = typeof updatedValue === "string" ? new Date(updatedValue) : null;

      const isNew = createdAtDate !== null && createdAtDate > lastPolledAtDate;
      const isUpdated = !isNew && updatedAtDate !== null && updatedAtDate > lastPolledAtDate;

      if (isNew && params.showNewRecords) created.push(record);
      else if (isUpdated && params.showUpdatedRecords) updated.push(record);
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
