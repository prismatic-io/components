import { pollingTrigger } from "@prismatic-io/spectral";
import { listUsers } from "../actions/users/listUsers";
import { updatedUsersPollingTriggerInputs } from "../inputs/webhooks";
export const updatedUsersPollingTrigger = pollingTrigger({
  display: {
    label: "Updated Users",
    description: "Fetches users updated on a recurring schedule.",
  },
  inputs: updatedUsersPollingTriggerInputs,
  perform: async (context, payload, { connection }) => {
    const lastState = context.polling.getState() as {
      lastUpdated: string;
    };
    const filter = lastState.lastUpdated
      ? `lastUpdated gt "${lastState.lastUpdated}"`
      : undefined;
    const params = {
      connection,
      pagination: { after: undefined, limit: undefined },
      sorting: { sortBy: undefined, sortOrder: undefined },
      filters: { search: undefined, filter, q: undefined },
      fetchAll: true,
      extraParameters: {},
    };
    const { data } = await listUsers.perform(context, params);
    const polledNoChanges = data.length === 0;
    context.polling.setState({ lastUpdated: new Date().toISOString() });
    return Promise.resolve({
      payload: { ...payload, body: { data } },
      polledNoChanges,
    });
  },
});
