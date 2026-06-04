import { pollingTrigger } from "@prismatic-io/spectral";
import { createBambooClient } from "../client";
import { pollChangesTriggerExamplePayload } from "../examplePayloads";
import { pollChangesInputs } from "../inputs";
import type { EmployeeChange, PollingState } from "../types";
import { fetchChangedEmployeesSince, partitionChangedEmployees } from "../util";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "Changed Employees",
    description:
      "Checks for new, updated, and deleted employees in BambooHR on a configured schedule.",
  },
  inputs: pollChangesInputs,
  examplePayload: pollChangesTriggerExamplePayload,
  perform: async (
    context,
    payload,
    { connection, showNewEmployees, showUpdatedEmployees },
  ) => {
    const now = new Date().toISOString();
    const pollState = context.polling.getState() as PollingState | undefined;
    const lastPolledAt = pollState?.lastPolledAt ?? now;

    const skipFetch = !showNewEmployees && !showUpdatedEmployees;
    const changes: EmployeeChange[] = skipFetch
      ? []
      : await fetchChangedEmployeesSince(
          createBambooClient(connection, context.debug.enabled),
          lastPolledAt,
        );
    const { created, updated } = partitionChangedEmployees(changes);

    context.polling.setState({ lastPolledAt: now } as Record<string, unknown>);

    const result = {
      created: showNewEmployees ? created : [],
      updated: showUpdatedEmployees ? updated : [],
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
