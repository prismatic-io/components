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
  perform: async (
    { debug: { enabled: debug } },
    { connection, cursor, limit, teamId, userId, fetchAll }
  ) => {
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
      return paginateResults(
        client,
        "users",
        "channels",
        "conversations",
        params
      );
    }

    const data = await client.users.conversations(params);
    return { data };
  },
  inputs: listUsersConversationsInputs,
  examplePayload: {
    data: listUserConversationsExamplePayload,
  },
});
