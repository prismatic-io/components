import { action } from "@prismatic-io/spectral";
import { createOauthClient } from "../../client";
import { conversationExistsInputs } from "../../inputs";
import { debugLogger } from "../../util";

export const conversationExists = action({
  display: {
    label: "Conversation Exists",
    description: "Returns true if the conversation already exists.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, channelName }
  ) => {
    debugLogger({ debug, channelName });
    const client = await createOauthClient({ slackConnection: connection });
    const data = await client.conversations.list();

    const channels = data.channels.filter((channel) => {
      return channel.name === channelName || channel.id === channelName;
    });

    if (channels.length > 0) {
      return { data: true };
    }

    return { data: false };
  },
  inputs: conversationExistsInputs,
  examplePayload: {
    data: true,
  },
});
