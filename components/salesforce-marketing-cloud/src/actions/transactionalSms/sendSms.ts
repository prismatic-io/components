import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { SMS_MESSAGES_PATH } from "../../constants";
import { sendSmsExamplePayload } from "../../examplePayloads";
import { sendSmsInputs } from "../../inputs";

export const sendSms = action({
  examplePayload: sendSmsExamplePayload,
  display: {
    label: "Send SMS",
    description:
      "Send a transactional SMS to a single recipient using a send definition.",
  },
  inputs: sendSmsInputs,
  perform: async (
    context,
    {
      connection,
      smsMessageKey,
      smsDefinitionKey,
      smsRecipientContactKey,
      smsRecipientPhone,
      smsRecipientAttributes,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);

    const body = {
      definitionKey: smsDefinitionKey,
      recipient: {
        contactKey: smsRecipientContactKey,
        to: smsRecipientPhone,
        attributes: smsRecipientAttributes || {},
      },
    };

    const { data } = await client.post(
      `${SMS_MESSAGES_PATH}/${encodeURIComponent(smsMessageKey)}`,
      body,
    );

    return { data };
  },
});
