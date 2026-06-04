import { action } from "@prismatic-io/spectral";
import { createOauthClient } from "../../client";
import { inviteUserToConversationExamplePayload } from "../../examplePayloads";
import { inviteUserToConversationInputs } from "../../inputs";
import { debugLogger } from "../../util";

export const inviteUserToConversation = action({
  display: {
    label: "Invite User to Conversation",
    description: "Invite a user to an existing conversation.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, channelName, userId }
  ) => {
    debugLogger({ debug, channelName, userId });
    const client = await createOauthClient({
      slackConnection: connection,
    });
    const data = await client.conversations.invite({
      channel: channelName,
      users: userId,
    });

    return { data };
  },
  inputs: inviteUserToConversationInputs,
  examplePayload: {
    data: inviteUserToConversationExamplePayload,
  },
});
