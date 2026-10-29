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
  inputs: listConversationMembersInputs,
  performSafety: "notAllowed",
  perform: async (
    { debug: { enabled: debug } },
    { fetchAll, connection, channelName, pagination },
  ) => {
    const { cursor, limit } = pagination;
    debugLogger({ debug, channelName, cursor, limit });
    const client = await createOauthClient({
      slackConnection: connection,
    });
    const params = {
      cursor: cursor || undefined,
      limit,
      channel: channelName,
    };

    if (fetchAll) {
      return await paginateResults(
        client,
        "conversations",
        "members",
        "members",
        params,
      );
    }

    const data = await client.conversations.members(params);

    return { data };
  },
  examplePerform: async (): Promise<{ data: unknown }> => ({
    data: listConversationMembersExamplePayload,
  }),
  examplePayload: {
    data: listConversationMembersExamplePayload,
  },
});
