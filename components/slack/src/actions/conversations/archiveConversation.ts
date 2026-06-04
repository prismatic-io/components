import { action } from "@prismatic-io/spectral";
import { createOauthClient } from "../../client";
import { archiveConversationExamplePayload } from "../../examplePayloads";
import { archiveConversationInputs } from "../../inputs";
import { debugLogger } from "../../util";

export const archiveConversation = action({
  display: {
    label: "Archive Conversation",
    description: "Archive an existing conversation.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, channelName }
  ) => {
    debugLogger({ debug, channelName });
    const client = await createOauthClient({
      slackConnection: connection,
    });
    const data = await client.conversations.archive({
      channel: channelName,
    });
    return { data };
  },
  inputs: archiveConversationInputs,
  examplePayload: {
    data: archiveConversationExamplePayload,
  },
});
