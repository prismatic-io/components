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
  inputs: renameConversationInputs,
  performSafety: "notAllowed",
  perform: async (
    { debug: { enabled: debug } },
    { connection, newConversationName, conversationName },
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
  examplePerformSafety: "safe",
  examplePerform: async (
    _context,
    { newConversationName },
  ): Promise<{
    data: unknown;
  }> => {
    const name = newConversationName
      .toLowerCase()
      .replace(/[^a-z0-9_-]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80);
    return {
      data: {
        ...renameConversationExamplePayload,
        channel: {
          ...renameConversationExamplePayload.channel,
          name,
          name_normalized: name,
        },
      },
    };
  },
  examplePayload: {
    data: renameConversationExamplePayload,
  },
});
