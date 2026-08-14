import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { SMS_MESSAGES_PATH } from "../../constants";
import { sendSmsExamplePayload } from "../../examplePayloads";
import { sendSmsInputs } from "../../inputs";
import { sendSmsOutputSchema } from "../../outputSchemas";
export const sendSms = action({
  examplePayload: sendSmsExamplePayload,
  display: {
    label: "Send SMS",
    description:
      "Send a transactional SMS to a single recipient using a send definition.",
  },
  inputs: sendSmsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: sendSmsOutputSchema,
  }),
  performSafety: "notAllowed",
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
  examplePerform: async (
    _context,
    { smsMessageKey },
  ): Promise<{
    data: unknown;
  }> => ({
    data: {
      ...sendSmsExamplePayload.data,
      responses: [{ messageKey: smsMessageKey }],
    },
  }),
});
