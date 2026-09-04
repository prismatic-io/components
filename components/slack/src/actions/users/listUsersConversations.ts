import { action } from "@prismatic-io/spectral";
import { assertTeamIdForOrgToken, createOauthClient } from "../../client";
import { listUserConversationsExamplePayload } from "../../examplePayloads";
import { listUsersConversationsInputs } from "../../inputs";
import { debugLogger, paginateResults } from "../../util";
export const listUsersConversations = action({
  display: {
    label: "List User Conversations",
    description: "List all conversations for a user.",
  },
  inputs: listUsersConversationsInputs,
  performSafety: "notAllowed",
  perform: async (
    { debug: { enabled: debug } },
    { connection, pagination, teamId, userId, fetchAll },
  ) => {
    const { cursor, limit } = pagination;
    debugLogger({ cursor, limit, teamId, userId, debug });
    assertTeamIdForOrgToken(connection, teamId, "users.conversations");
    const client = await createOauthClient({
      slackConnection: connection,
    });
    const params = {
      user: userId || undefined,
      cursor: cursor || undefined,
      limit,
      team_id: teamId || undefined,
    };
    if (fetchAll) {
      return await paginateResults(
        client,
        "users",
        "channels",
        "conversations",
        params,
      );
    }
    const data = await client.users.conversations(params);
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: listUserConversationsExamplePayload,
  }),
  examplePayload: {
    data: listUserConversationsExamplePayload,
  },
});
