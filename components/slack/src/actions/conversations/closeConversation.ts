import { action } from "@prismatic-io/spectral";
import { createOauthClient } from "../../client";
import { closeConversationExamplePayload } from "../../examplePayloads";
import { closeConversationInputs } from "../../inputs";
import { debugLogger } from "../../util";

export const closeConversation = action({
  display: {
    label: "Close Conversation",
    description: "Close an existing conversation.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, conversationName }
  ) => {
    debugLogger({ debug, conversationName });
    const client = await createOauthClient({
      slackConnection: connection,
    });
    const data = await client.conversations.close({
      channel: conversationName,
    });
    return { data };
  },
  inputs: closeConversationInputs,
  examplePayload: {
    data: closeConversationExamplePayload,
  },
});
