import { pollingTrigger } from "@prismatic-io/spectral";
import { listUsers } from "../actions/users/listUsers";
import { newUsersPollingTriggerInputs } from "../inputs/webhooks";
import type { UsersPollingState } from "../interfaces/polling";
import type { User } from "../interfaces/user";
import { TRIGGER_BATCH_SIZE } from "../util/constants";
import { resolveUserChanges, usersPollParams } from "../util/polling";

export const newUsersPollingTrigger = pollingTrigger({
  display: {
    label: "New Users",
    description:
      "Retrieves existing and ongoing users created in Okta. Load history once, check for changes on a schedule, or both.",
  },
  inputs: newUsersPollingTriggerInputs,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: TRIGGER_BATCH_SIZE },
  triggerResolver: {
    resolveItems: (_context, { payload }) =>
      resolveUserChanges("created", payload.body.data as User[] | undefined),
  },
  perform: async (context, payload, { connection, lookBackDate }) => {
    const pollStartedAt = new Date().toISOString();
    const state = (context.polling.getState() ?? {}) as UsersPollingState;
    const since = state.lastUpdated || lookBackDate || undefined;
    let users: User[] = [];
    if (since) {
      const { data } = await listUsers.perform(
        context,
        usersPollParams(connection, `lastUpdated gt "${since}"`),
      );
      users = (data as User[]).filter(
        (user) => new Date(user.created) >= new Date(since),
      );
    }

    context.polling.setState({
      lastUpdated: pollStartedAt,
    } satisfies UsersPollingState);

    return {
      payload: { ...payload, body: { data: users } },
      polledNoChanges: users.length === 0,
    };
  },
});
