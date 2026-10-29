import { pollingTrigger } from "@prismatic-io/spectral";
import { createClient, validateV2Connection } from "../client";
import { connectionInput, showNewRecords, triggerCompanyId } from "../inputs";
import type { PaylocityRecord, PollingState } from "../types";
import { fetchEmployees } from "../util";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New Employees",
    description:
      "Checks for new employees in a Paylocity company on a configured schedule.",
  },
  inputs: {
    connection: connectionInput,
    companyId: triggerCompanyId,
    showNewRecords,
  },
  perform: async (
    context,
    payload,
    { connection, companyId, showNewRecords },
  ) => {
    validateV2Connection(connection);
    const client = await createClient(connection, context.debug.enabled);

    const employees = (await fetchEmployees(
      client,
      companyId,
      0,
      0,
      false,
    )) as PaylocityRecord[];

    const lastState = context.polling.getState() as PollingState;
    const isFirstPoll = lastState?.knownIds === undefined;
    const currentIds = employees.map((e) => e.employeeId);

    if (isFirstPoll) {
      context.polling.setState({
        knownIds: currentIds,
      } as unknown as Record<string, unknown>);
      return {
        payload: {
          ...payload,
          body: { data: { created: [], updated: [] } },
        },
        polledNoChanges: true,
      };
    }

    const knownSet = new Set(lastState.knownIds);
    const newEmployees = employees.filter(
      (e) => e.employeeId && !knownSet.has(e.employeeId),
    );

    context.polling.setState({
      knownIds: currentIds,
    } as unknown as Record<string, unknown>);

    const filteredCreated = showNewRecords ? newEmployees : [];

    if (context.debug.enabled) {
      context.logger.debug(
        `Polled employees: ${employees.length} total, ${filteredCreated.length} new`,
      );
    }

    return {
      payload: {
        ...payload,
        body: { data: { created: filteredCreated, updated: [] } },
      },
      polledNoChanges: filteredCreated.length === 0,
    };
  },
});
