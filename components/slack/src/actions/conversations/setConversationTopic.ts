import { action } from "@prismatic-io/spectral";
import { createOauthClient } from "../../client";
import { inviteUserToConversationExamplePayload as setConversationTopicResponse } from "../../examplePayloads";
import { setConversationTopicInputs } from "../../inputs";
import { debugLogger } from "../../util";
export const setConversationTopic = action({
  display: {
    label: "Set Conversation Topic",
    description: "Set the topic of an existing conversation.",
  },
  inputs: setConversationTopicInputs,
  performSafety: "notAllowed",
  perform: async (
    { debug: { enabled: debug } },
    { connection, channelName, topic },
  ) => {
    debugLogger({ debug, channelName, topic });
    const client = await createOauthClient({
      slackConnection: connection,
    });
    const data = await client.conversations.setTopic({
      channel: channelName,
      topic,
    });
    return { data };
  },
  examplePerformSafety: "safe",
  examplePerform: async (
    _context,
    { topic },
  ): Promise<{
    data: unknown;
  }> => ({
    data: {
      ...setConversationTopicResponse,
      channel: {
        ...setConversationTopicResponse.channel,
        topic: {
          ...setConversationTopicResponse.channel.topic,
          value: topic,
        },
      },
    },
  }),
  examplePayload: {
    data: setConversationTopicResponse,
  },
});
