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
    const lastState = context.polling.getState() as { lastUpdated: string };
    const filter = lastState.lastUpdated ? `lastUpdated gt "${lastState.lastUpdated}"` : undefined;
    const params = {
      connection,
      after: undefined,
      limit: undefined,
      q: undefined,
      search: undefined,
      sortBy: undefined,
      sortOrder: undefined,
      filter,
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
