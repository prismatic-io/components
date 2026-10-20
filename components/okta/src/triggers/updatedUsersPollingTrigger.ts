import { pollingTrigger } from "@prismatic-io/spectral";
import { listUsers } from "../actions/users/listUsers";
import { updatedUsersPollingTriggerInputs } from "../inputs/webhooks";
import type { UsersPollingState } from "../interfaces/polling";
import type { User } from "../interfaces/user";
import { TRIGGER_BATCH_SIZE } from "../util/constants";
import { resolveUserChanges, usersPollParams } from "../util/polling";
export const updatedUsersPollingTrigger = pollingTrigger({
  display: {
    label: "Updated Users",
    description:
      "Retrieves existing and ongoing users updated in Okta. Load history once, check for changes on a schedule, or both.",
  },
  inputs: updatedUsersPollingTriggerInputs,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: TRIGGER_BATCH_SIZE },
  triggerResolver: {
    resolveItems: (_context, { payload }) =>
      resolveUserChanges("updated", payload.body.data as User[] | undefined),
  },
  perform: async (context, payload, { connection, lookBackDate }) => {
    const pollStartedAt = new Date().toISOString();
    const state = (context.polling.getState() ?? {}) as UsersPollingState;
    const since = state.lastUpdated || lookBackDate || undefined;
    const users: User[] = since
      ? ((
          await listUsers.perform(
            context,
            usersPollParams(connection, `lastUpdated gt "${since}"`),
          )
        ).data as User[])
      : [];
    context.polling.setState({
      lastUpdated: pollStartedAt,
    } satisfies UsersPollingState);
    return {
      payload: { ...payload, body: { data: users } },
      polledNoChanges: users.length === 0,
    };
  },
});
