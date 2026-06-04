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
  perform: async (
    { debug: { enabled: debug } },
    { connection, message, channelName, username, messageId }
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
  inputs: postMessageInputs,
  examplePayload: {
    data: sendMessageExamplePayload,
  },
});
