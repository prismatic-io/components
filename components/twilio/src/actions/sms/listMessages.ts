import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { listMessagesExamplePayload } from "../../examplePayloads";
import { listMessagesInputs } from "../../inputs";

export const listMessages = action({
  display: {
    label: "List SMS Messages",
    description: "List SMS messages from the Twilio account.",
  },
  perform: async (context, { twilioConnection }) => {
    const twilioClient = createAuthorizedClient(
      twilioConnection,
      context.debug.enabled,
    );
    const result = (await twilioClient.messages.list()).map((message) =>
      message.toJSON(),
    );

    return {
      data: result,
    };
  },
  inputs: listMessagesInputs,
  examplePayload: listMessagesExamplePayload,
});
