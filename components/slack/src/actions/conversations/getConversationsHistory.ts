import { action } from "@prismatic-io/spectral";
import { createOauthClient } from "../../client";
import { getConversationHistoryExamplePayload } from "../../examplePayloads";
import { getConversationsHistoryInputs } from "../../inputs";
import { debugLogger, paginateResults } from "../../util";

export const getConversationsHistory = action({
  display: {
    label: "Get Conversation History",
    description: "Get the history of a conversation.",
  },
  perform: async (
    { debug: { enabled: debug } },
    {
      connection,
      cursor,
      includeAllMetadata,
      limit,
      channelName,
      oldest,
      inclusive,
      latest,
      fetchAll,
    }
  ) => {
    debugLogger({
      debug,
      channelName,
      cursor,
      includeAllMetadata,
      limit,
      oldest,
      inclusive,
      latest,
    });
    const client = await createOauthClient({
      slackConnection: connection,
    });
    const params = {
      channel: channelName,
      cursor: cursor || undefined,
      include_all_metadata: includeAllMetadata || undefined,
      limit: limit || undefined,
      inclusive,
      ...(oldest ? { oldest } : {}),
      ...(latest ? { latest } : {}),
    };

    if (fetchAll) {
      return paginateResults(
        client,
        "conversations",
        "messages",
        "history",
        params
      );
    }

    const data = await client.conversations.history(params);
    return { data };
  },
  inputs: getConversationsHistoryInputs,
  examplePayload: {
    data: getConversationHistoryExamplePayload,
  },
});
