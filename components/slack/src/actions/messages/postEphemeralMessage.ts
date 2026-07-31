import { action } from "@prismatic-io/spectral";
import { createOauthClient } from "../../client";
import { postEphemeralMessageExamplePayload } from "../../examplePayloads";
import { postEphemeralMessageInputs } from "../../inputs";
import { debugLogger } from "../../util";
export const postEphemeralMessage = action({
  display: {
    label: "Post Ephemeral Message",
    description: "Post an ephemeral message to a user or channel.",
  },
  inputs: postEphemeralMessageInputs,
  performSafety: "notAllowed",
  perform: async (
    { debug: { enabled: debug } },
    { connection, channelName, userId, username, message },
  ) => {
    debugLogger({ channelName, userId, username, message, debug });
    const client = await createOauthClient({
      slackConnection: connection,
    });
    const data = await client.chat.postEphemeral({
      channel: channelName,
      user: userId,
      username: username || undefined,
      text: message || undefined,
    });
    return { data };
  },
  examplePerformSafety: "safe",
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: postEphemeralMessageExamplePayload,
  }),
  examplePayload: {
    data: postEphemeralMessageExamplePayload,
  },
});
