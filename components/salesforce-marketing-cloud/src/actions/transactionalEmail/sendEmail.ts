import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { EMAIL_MESSAGES_PATH } from "../../constants";
import { sendEmailExamplePayload } from "../../examplePayloads";
import { sendEmailInputs } from "../../inputs";
import { sendEmailOutputSchema } from "../../outputSchemas";
export const sendEmail = action({
  examplePayload: sendEmailExamplePayload,
  display: {
    label: "Send Email",
    description:
      "Send a transactional email to a single recipient using a send definition.",
  },
  inputs: sendEmailInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: sendEmailOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      messageKey,
      emailDefinitionKey,
      recipientContactKey,
      recipientEmail,
      recipientAttributes,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const body = {
      definitionKey: emailDefinitionKey,
      recipient: {
        contactKey: recipientContactKey,
        to: recipientEmail,
        attributes: recipientAttributes || {},
      },
    };
    const { data } = await client.post(
      `${EMAIL_MESSAGES_PATH}/${encodeURIComponent(messageKey)}`,
      body,
    );
    return { data };
  },
  examplePerform: async (
    _context,
    { messageKey },
  ): Promise<{
    data: unknown;
  }> => ({
    data: {
      ...sendEmailExamplePayload.data,
      responses: [
        {
          messageKey:
            messageKey ?? sendEmailExamplePayload.data.responses[0].messageKey,
        },
      ],
    },
  }),
});
