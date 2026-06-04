import { action } from "@prismatic-io/spectral";
import { createOauthClient } from "../../client";
import { listConversationMembersExamplePayload } from "../../examplePayloads";
import { listConversationMembersInputs } from "../../inputs";
import { debugLogger, paginateResults } from "../../util";

export const listConversationMembers = action({
  display: {
    label: "List Conversation Members",
    description: "List all members of a conversation.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { fetchAll, connection, channelName, cursor, limit }
  ) => {
    debugLogger({ debug, channelName, cursor, limit });
    const client = await createOauthClient({
      slackConnection: connection,
    });
    const params = {
      cursor: cursor || undefined,
      limit: limit || undefined,
      channel: channelName,
    };

    if (fetchAll) {
      return paginateResults(
        client,
        "conversations",
        "members",
        "members",
        params
      );
    }

    const data = await client.conversations.members(params);
    return { data };
  },
  inputs: listConversationMembersInputs,
  examplePayload: {
    data: listConversationMembersExamplePayload,
  },
});
