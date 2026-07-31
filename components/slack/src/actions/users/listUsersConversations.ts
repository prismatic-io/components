import { action } from "@prismatic-io/spectral";
import { createOauthClient } from "../../client";
import { listUserConversationsExamplePayload } from "../../examplePayloads";
import { listUsersConversationsInputs } from "../../inputs";
import { debugLogger, paginateResults } from "../../util";
export const listUsersConversations = action({
  display: {
    label: "List User Conversations",
    description: "List all conversations for a user.",
  },
  inputs: listUsersConversationsInputs,
  performSafety: "safe",
  perform: async (
    { debug: { enabled: debug } },
    { connection, pagination, teamId, userId, fetchAll },
  ) => {
    const { cursor, limit } = pagination;
    debugLogger({ cursor, limit, teamId, userId, debug });
    const client = await createOauthClient({
      slackConnection: connection,
    });
    const params = {
      user: userId || undefined,
      cursor: cursor || undefined,
      limit: limit || undefined,
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
  examplePayload: {
    data: listUserConversationsExamplePayload,
  },
});
