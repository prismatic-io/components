import { action } from "@prismatic-io/spectral";
import { createOauthClient } from "../../client";
import { deletePendingMessageExamplePayload } from "../../examplePayloads";
import { deletePendingMessageInputs } from "../../inputs";
import { debugLogger } from "../../util";

export const deletePendingMessage = action({
  display: {
    label: "Delete Pending Scheduled Message",
    description:
      "Delete the content and metadata of a pending scheduled message from a queue.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, messageId, channelId }
  ) => {
    debugLogger({ messageId, channelId, debug });
    const client = await createOauthClient({
      slackConnection: connection,
    });
    const data = await client.chat.deleteScheduledMessage({
      channel: channelId,
      scheduled_message_id: messageId,
    });
    return { data };
  },
  inputs: deletePendingMessageInputs,
  examplePayload: {
    data: deletePendingMessageExamplePayload,
  },
});
