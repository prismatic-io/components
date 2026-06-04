import { action } from "@prismatic-io/spectral";
import { createOauthClient } from "../../client";
import { createConversationExamplePayload } from "../../examplePayloads";
import { createConversationInputs } from "../../inputs";
import { debugLogger } from "../../util";

export const createConversation = action({
  display: {
    label: "Create Conversation",
    description: "Create a new conversation.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, isPrivate, conversationName, teamId }
  ) => {
    debugLogger({ debug, isPrivate, conversationName, teamId });
    const client = await createOauthClient({ slackConnection: connection });
    const data = await client.conversations.create({
      name: conversationName,
      is_private: isPrivate || undefined,
      team_id: teamId || undefined,
    });
    return { data };
  },
  inputs: createConversationInputs,
  examplePayload: {
    data: createConversationExamplePayload,
  },
});
