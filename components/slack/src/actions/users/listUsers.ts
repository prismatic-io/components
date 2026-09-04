import { action } from "@prismatic-io/spectral";
import { assertTeamIdForOrgToken, createOauthClient } from "../../client";
import { listUsersExamplePayload } from "../../examplePayloads";
import { listUsersInputs } from "../../inputs";
import { debugLogger, paginateResults } from "../../util";
export const listUsers = action({
  display: {
    label: "List Users",
    description: "List all users in the workspace.",
  },
  inputs: listUsersInputs,
  performSafety: "notAllowed",
  perform: async (
    { debug: { enabled: debug } },
    { fetchAll, connection, pagination, teamId },
  ) => {
    const { cursor, limit } = pagination;
    debugLogger({ cursor, limit, teamId, debug });
    assertTeamIdForOrgToken(connection, teamId, "users.list");
    const client = await createOauthClient({
      slackConnection: connection,
    });
    const params = {
      cursor: cursor || undefined,
      limit,
      team_id: teamId || undefined,
    };
    if (fetchAll) {
      return await paginateResults(client, "users", "members", "list", params);
    }
    const data = await client.users.list(params);
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: listUsersExamplePayload,
  }),
  examplePayload: {
    data: listUsersExamplePayload,
  },
});
