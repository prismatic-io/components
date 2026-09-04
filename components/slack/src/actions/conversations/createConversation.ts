import { action } from "@prismatic-io/spectral";
import { assertTeamIdForOrgToken, createOauthClient } from "../../client";
import { createConversationExamplePayload } from "../../examplePayloads";
import { createConversationInputs } from "../../inputs";
import { debugLogger } from "../../util";
export const createConversation = action({
  display: {
    label: "Create Conversation",
    description: "Create a new conversation.",
  },
  inputs: createConversationInputs,
  performSafety: "notAllowed",
  perform: async (
    { debug: { enabled: debug } },
    { connection, isPrivate, conversationName, teamId },
  ) => {
    debugLogger({ debug, isPrivate, conversationName, teamId });
    assertTeamIdForOrgToken(connection, teamId, "conversations.create");
    const client = await createOauthClient({ slackConnection: connection });
    const data = await client.conversations.create({
      name: conversationName,
      is_private: isPrivate || undefined,
      team_id: teamId || undefined,
    });
    return { data };
  },
  examplePerform: async (
    _context,
    { conversationName, isPrivate },
  ): Promise<{
    data: unknown;
  }> => {
    const name = conversationName
      .toLowerCase()
      .replace(/[^a-z0-9_-]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80);
    return {
      data: {
        ...createConversationExamplePayload,
        channels: [
          {
            ...createConversationExamplePayload.channels[0],
            name,
            name_normalized: name,
            is_private: isPrivate,
          },
        ],
      },
    };
  },
  examplePayload: {
    data: createConversationExamplePayload,
  },
});
