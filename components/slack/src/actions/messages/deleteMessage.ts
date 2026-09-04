import { action } from "@prismatic-io/spectral";
import { createOauthClient } from "../../client";
import { deleteMessageExamplePayload } from "../../examplePayloads";
import { deleteMessageInputs } from "../../inputs";
import { debugLogger } from "../../util";
export const deleteMessage = action({
  display: {
    label: "Delete Message",
    description: "Delete the content and metadata of an existing message.",
  },
  inputs: deleteMessageInputs,
  performSafety: "notAllowed",
  perform: async (
    { debug: { enabled: debug } },
    { connection, messageId, channelId },
  ) => {
    debugLogger({ messageId, channelId, debug });
    const client = await createOauthClient({
      slackConnection: connection,
    });
    const data = await client.chat.delete({
      channel: channelId,
      ts: messageId,
    });
    return { data };
  },
  examplePerform: async (
    _context,
    { messageId, channelId },
  ): Promise<{
    data: unknown;
  }> => ({
    data: {
      ...deleteMessageExamplePayload,
      channel: channelId,
      ts: messageId,
    },
  }),
  examplePayload: {
    data: deleteMessageExamplePayload,
  },
});
