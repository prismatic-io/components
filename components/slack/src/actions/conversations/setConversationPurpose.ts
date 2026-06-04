import { action } from "@prismatic-io/spectral";
import { createOauthClient } from "../../client";




import { archiveConversationExamplePayload as setConversationPurposeResponse } from "../../examplePayloads";
import { setConversationPurposeInputs } from "../../inputs";
import { debugLogger } from "../../util";

export const setConversationPurpose = action({
  display: {
    label: "Set Conversation Purpose",
    description: "Set the purpose of an existing conversation.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, channelName, purpose }
  ) => {
    debugLogger({ debug, channelName, purpose });
    const client = await createOauthClient({
      slackConnection: connection,
    });
    const data = await client.conversations.setPurpose({
      channel: channelName,
      purpose,
    });

    return { data };
  },
  inputs: setConversationPurposeInputs,
  examplePayload: {
    data: setConversationPurposeResponse,
  },
});
