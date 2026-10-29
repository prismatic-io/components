import { pollingTrigger } from "@prismatic-io/spectral";
import { createBambooClient } from "../client";
import { DEFAULT_BATCH_SIZE } from "../constants";
import { pollChangesTriggerExamplePayload } from "../examplePayloads";
import { pollChangesInputs } from "../inputs";
import type { EmployeeChange, PollingState } from "../types";
import type { BambooHRChangesObject, BambooHRRecordChange } from "../util";
import {
  fetchChangedEmployeesSince,
  partitionChangedEmployees,
  resolvePollingRecordChanges,
} from "../util";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "Changed Employees",
    description:
      "Retrieves existing and ongoing employee changes from BambooHR. Load history once, check for changes on a schedule, or both.",
  },
  inputs: pollChangesInputs,
  examplePayload: pollChangesTriggerExamplePayload,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: DEFAULT_BATCH_SIZE },
  triggerResolver: {
    resolveItems: (_context, { payload }): BambooHRRecordChange[] =>
      resolvePollingRecordChanges(payload.body.data as BambooHRChangesObject),
  },
  perform: async (
    context,
    payload,
    { connection, lookBackDate, showNewEmployees, showUpdatedEmployees },
  ) => {
    const now = new Date().toISOString();
    const pollState = context.polling.getState() as PollingState | undefined;
    const lastPolledAt = pollState?.lastPolledAt ?? (lookBackDate || now);
    const isBackfill = !pollState?.lastPolledAt && Boolean(lookBackDate);

    const skipFetch = !isBackfill && !showNewEmployees && !showUpdatedEmployees;
    const changes: EmployeeChange[] = skipFetch
      ? []
      : await fetchChangedEmployeesSince(
          createBambooClient(connection, context.debug.enabled),
          lastPolledAt,
        );
    const { created, updated } = partitionChangedEmployees(changes);

    context.polling.setState({ lastPolledAt: now } as Record<string, unknown>);

    const result = {
      created: isBackfill || showNewEmployees ? created : [],
      updated: isBackfill || showUpdatedEmployees ? updated : [],
    };

    if (context.debug.enabled) {
      context.logger.debug(
        `Polled BambooHR changes since ${lastPolledAt}: ${changes.length} total → ${created.length} new, ${updated.length} updated/deleted`,
      );
    }

    return {
      payload: { ...payload, body: { data: result } },
      polledNoChanges:
        result.created.length === 0 && result.updated.length === 0,
    };
  },
});
