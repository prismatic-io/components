import { action } from "@prismatic-io/spectral";
import { createOauthClient } from "../../client";
import { listUsersExamplePayload } from "../../examplePayloads";
import { listUsersInputs } from "../../inputs";
import { debugLogger, paginateResults } from "../../util";

export const listUsers = action({
  display: {
    label: "List Users",
    description: "List all users in the workspace.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { fetchAll, connection, cursor, limit, teamId }
  ) => {
    debugLogger({ cursor, limit, teamId, debug });
    const client = await createOauthClient({
      slackConnection: connection,
    });

    const params = {
      cursor: cursor || undefined,
      limit: limit || undefined,
      team_id: teamId || undefined,
    };

    if (fetchAll) {
      return paginateResults(client, "users", "members", "list", params);
    }

    const data = await client.users.list(params);
    return { data };
  },
  inputs: listUsersInputs,
  examplePayload: {
    data: listUsersExamplePayload,
  },
});
