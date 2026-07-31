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
  inputs: getConversationsHistoryInputs,
  performSafety: "safe",
  perform: async (
    { debug: { enabled: debug } },
    {
      connection,
      pagination,
      includeAllMetadata,
      channelName,
      timeRange,
      fetchAll,
    },
  ) => {
    const { cursor, limit } = pagination;
    const { oldest, latest, inclusive } = timeRange;
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
      return await paginateResults(
        client,
        "conversations",
        "messages",
        "history",
        params,
      );
    }
    const data = await client.conversations.history(params);
    return { data };
  },
  examplePayload: {
    data: getConversationHistoryExamplePayload,
  },
});
