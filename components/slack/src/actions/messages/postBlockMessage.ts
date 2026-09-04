import { action } from "@prismatic-io/spectral";
import { createOauthClient } from "../../client";
import { postBlockMessageExamplePayload } from "../../examplePayloads";
import { postBlockMessageInputs } from "../../inputs";
import { debugLogger } from "../../util";
export const postBlockMessage = action({
  display: {
    label: "Post Block Message",
    description: "Post a block-formatted message to a Slack channel.",
  },
  inputs: postBlockMessageInputs,
  performSafety: "notAllowed",
  perform: async (
    { debug: { enabled: debug } },
    { connection, blocks, message, channelName, username, messageId },
  ) => {
    debugLogger({ blocks, message, channelName, username, messageId, debug });
    const client = await createOauthClient({
      slackConnection: connection,
    });
    const data = await client.chat.postMessage({
      ...blocks,
      channel: channelName,
      username: username || undefined,
      text: message,
      thread_ts: messageId || undefined,
    });
    return { data };
  },
  examplePerform: async (
    _context,
    { channelName, message, username, messageId },
  ): Promise<{
    data: unknown;
  }> => ({
    data: {
      ...postBlockMessageExamplePayload,
      channel: channelName,
      message: {
        ...postBlockMessageExamplePayload.message,
        text: message,
        username: username || postBlockMessageExamplePayload.message.username,
        ...(messageId ? { thread_ts: messageId } : {}),
      },
    },
  }),
  examplePayload: {
    data: postBlockMessageExamplePayload,
  },
});
