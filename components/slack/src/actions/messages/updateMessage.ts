import { action } from "@prismatic-io/spectral";
import { createOauthClient } from "../../client";
import { updateMessageExamplePayload } from "../../examplePayloads";
import { updateMessageInputs } from "../../inputs";
import { debugLogger } from "../../util";

export const updateMessage = action({
  display: {
    label: "Update Message",
    description: "Update the contents of an existing message.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, message, channelId, messageId }
  ) => {
    debugLogger({ message, channelId, messageId, debug });
    const client = await createOauthClient({
      slackConnection: connection,
    });
    const data = await client.chat.update({
      channel: channelId,
      ts: messageId,
      text: message || undefined,
    });
    return { data };
  },
  inputs: updateMessageInputs,
  examplePayload: {
    data: updateMessageExamplePayload,
  },
});
