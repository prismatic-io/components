import { pollingTrigger } from "@prismatic-io/spectral";
import { getSystemLogs } from "../actions/misc/getSystemLogs";
import { newSystemLogsPollingTriggerInputs } from "../inputs/webhooks";
export const newSystemLogsPollingTrigger = pollingTrigger({
  display: {
    label: "New System Logs",
    description: "Fetches system logs created on a recurring schedule.",
  },
  inputs: newSystemLogsPollingTriggerInputs,
  perform: async (context, payload, { connection, filter }) => {
    const lastState = context.polling.getState() as {
      lastUpdated: string;
    };
    const since = lastState.lastUpdated || undefined;
    const params = {
      connection,
      filters: { since, until: undefined, filter, q: undefined },
      pagination: { after: undefined, limit: undefined },
      sortOrder: "ASCENDING",
      fetchAll: true,
    };
    const actionReturn = await getSystemLogs.perform(context, params);
    const data = actionReturn?.data as unknown[];
    const polledNoChanges = data.length === 0;
    context.polling.setState({ lastUpdated: new Date().toISOString() });
    return Promise.resolve({
      payload: { ...payload, body: { data } },
      polledNoChanges,
    });
  },
});
