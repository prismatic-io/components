import { pollingTrigger, util } from "@prismatic-io/spectral";
import { createBasicAuthClient } from "../client";
import { pollEmployeeChangesInputs } from "../inputs";
import type { EmployeeChange, EmployeeChangesPollingState } from "../types";
import { fetchAllPages } from "../util";







export const pollEmployeeChanges = pollingTrigger({
  display: {
    label: "Employee Changes",
    description:
      "Checks for new and updated employee records (hires, terminations, transfers, promotions) on a configured schedule.",
  },
  inputs: pollEmployeeChangesInputs,
  perform: async (context, payload, { connection, companyId }) => {
    const now = new Date().toISOString();
    const pollState = context.polling.getState() as EmployeeChangesPollingState;
    const lastPollTime = pollState.lastPollTime || now;

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

    const changes = await fetchAllPages<EmployeeChange>(client, "/personnel/v1/employee-changes", {
      params,
    });

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
