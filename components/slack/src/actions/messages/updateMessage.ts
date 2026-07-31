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
  inputs: updateMessageInputs,
  performSafety: "notAllowed",
  perform: async (
    { debug: { enabled: debug } },
    { connection, message, channelId, messageId },
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
  examplePerformSafety: "safe",
  examplePerform: async (
    _context,
    { channelId, messageId, message },
  ): Promise<{
    data: unknown;
  }> => ({
    data: {
      ...updateMessageExamplePayload,
      channel: channelId,
      ts: messageId,
      text: message,
      message: {
        ...updateMessageExamplePayload.message,
        text: message,
      },
    },
  }),
  examplePayload: {
    data: updateMessageExamplePayload,
  },
});
