import { action } from "@prismatic-io/spectral";
import { createOauthClient } from "../../client";
import { sendMessageExamplePayload } from "../../examplePayloads";
import { postMessageInputs } from "../../inputs";
import { debugLogger } from "../../util";
export const postMessage = action({
  display: {
    label: "Post Message",
    description: "Post a message to a Slack channel.",
  },
  inputs: postMessageInputs,
  performSafety: "notAllowed",
  perform: async (
    { debug: { enabled: debug } },
    { connection, message, channelName, username, messageId },
  ) => {
    debugLogger({
      connection,
      message,
      channelName,
      username,
      messageId,
      debug,
    });
    const client = await createOauthClient({
      slackConnection: connection,
    });
    const data = await client.chat.postMessage({
      username: username || undefined,
      channel: channelName,
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
      ...sendMessageExamplePayload,
      channel: channelName,
      message: {
        ...sendMessageExamplePayload.message,
        text: message,
        username: username || sendMessageExamplePayload.message.username,
        ...(messageId ? { thread_ts: messageId } : {}),
      },
    },
  }),
  examplePayload: {
    data: sendMessageExamplePayload,
  },
});
