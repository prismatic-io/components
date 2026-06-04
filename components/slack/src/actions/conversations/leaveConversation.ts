import { action } from "@prismatic-io/spectral";
import { createOauthClient } from "../../client";
import { leaveConversationExamplePayload } from "../../examplePayloads";
import { leaveConversationInputs } from "../../inputs";
import { debugLogger } from "../../util";

export const leaveConversation = action({
  display: {
    label: "Leave Conversation",
    description: "Leave an existing conversation.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, channelName }
  ) => {
    debugLogger({ debug, channelName });
    const client = await createOauthClient({
      slackConnection: connection,
    });
    const data = await client.conversations.leave({
      channel: channelName,
    });
    return { data };
  },
  inputs: leaveConversationInputs,
  examplePayload: {
    data: leaveConversationExamplePayload,
  },
});
