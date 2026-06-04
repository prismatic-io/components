import { pollingTrigger } from "@prismatic-io/spectral";
import { listUsers } from "../actions/users/listUsers";
import { newUsersPollingTriggerInputs } from "../inputs/webhooks";
import type { User } from "../interfaces/user";

export const newUsersPollingTrigger = pollingTrigger({
  display: {
    label: "New Users",
    description: "Fetches users created on a recurring schedule.",
  },
  inputs: newUsersPollingTriggerInputs,
  perform: async (context, payload, { connection }) => {
    const users: User[] = [];
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
    const actionReturn = await listUsers.perform(context, params);
    const data = actionReturn?.data as User[];

    for (const user of data) {
      if (new Date(user.created) >= new Date(lastState.lastUpdated)) {
        users.push(user);
      }
    }

    const polledNoChanges = users.length === 0;

    context.polling.setState({ lastUpdated: new Date().toISOString() });

    return Promise.resolve({
      payload: { ...payload, body: { data: users } },
      polledNoChanges,
    });
  },
});
