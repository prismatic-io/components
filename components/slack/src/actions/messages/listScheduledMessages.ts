import { action } from "@prismatic-io/spectral";
import { createOauthClient } from "../../client";
import { listScheduledMessagesExamplePayload } from "../../examplePayloads";
import { listScheduledMessagesInputs } from "../../inputs";

export const listScheduledMessages = action({
  display: {
    label: "List Scheduled Messages",
    description: "List all scheduled messages.",
  },
  perform: async (context, { connection }) => {
    const client = await createOauthClient({
      slackConnection: connection,
    });
    const data = await client.chat.scheduledMessages.list();
    return { data };
  },
  inputs: listScheduledMessagesInputs,
  examplePayload: {
    data: listScheduledMessagesExamplePayload as unknown,
  },
});
