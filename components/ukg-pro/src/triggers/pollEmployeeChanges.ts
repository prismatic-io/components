import { pollingTrigger, util } from "@prismatic-io/spectral";
import { createBasicAuthClient } from "../client";
import { pollEmployeeChangesInputs } from "../inputs";
import type {
  EmployeeChange,
  EmployeeChangeRecordChange,
  EmployeeChangesPollingState,
} from "../types";
import { fetchAllPages, resolveEmployeeChangeRecords } from "../util";
export const pollEmployeeChanges = pollingTrigger({
  display: {
    label: "Employee Changes",
    description:
      "Retrieves existing and ongoing employee records (hires, terminations, transfers, promotions) for a specified UKG Pro company (or all companies, if omitted). Load history once, check for changes on a schedule, or both.",
  },
  inputs: pollEmployeeChangesInputs,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: 50 },
  triggerResolver: {
    resolveItems: (_context, { payload }): EmployeeChangeRecordChange[] =>
      resolveEmployeeChangeRecords(payload.body.data as EmployeeChange[]),
  },
  perform: async (
    context,
    payload,
    { connection, companyId, lookBackDate },
  ) => {
    const now = new Date().toISOString();
    const pollState = context.polling.getState() as EmployeeChangesPollingState;
    const lastPollTime =
      pollState.lastPollTime ||
      (lookBackDate ? `${lookBackDate}T00:00:00.000Z` : now);
    context.logger.debug(`Last polled at: ${lastPollTime}`);
    if (context.debug.enabled) {
      context.logger.debug(`Polling state: ${JSON.stringify(pollState)}`);
    }
    const client = createBasicAuthClient(connection, context.debug.enabled);
    const params: Record<string, unknown> = {
      start_date: lastPollTime.split("T")[0],
      end_date: now.split("T")[0],
    };
    if (companyId) {
      params.company = util.types.toString(companyId);
    }
    const changes = await fetchAllPages<EmployeeChange>(
      client,
      "/personnel/v1/employee-changes",
      {
        params,
      },
    );
    context.polling.setState({ lastPollTime: now });
    return {
      payload: {
        ...payload,
        body: {
          data: changes,
        },
      },
      polledNoChanges: changes.length === 0,
    };
  },
});
