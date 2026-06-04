import { action } from "@prismatic-io/spectral";
import { createOauthClient } from "../../client";
import { renameConversationExamplePayload } from "../../examplePayloads";
import { renameConversationInputs } from "../../inputs";
import { debugLogger } from "../../util";

export const renameConversation = action({
  display: {
    label: "Rename Conversation",
    description: "Rename an existing conversation.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, newConversationName, conversationName }
  ) => {
    debugLogger({ debug, newConversationName, conversationName });
    const client = await createOauthClient({
      slackConnection: connection,
    });
    const data = await client.conversations.rename({
      channel: conversationName,
      name: newConversationName,
    });
    return { data };
  },
  inputs: renameConversationInputs,
  examplePayload: {
    data: renameConversationExamplePayload,
  },
});
