import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { SMS_MESSAGES_PATH } from "../../constants";
import { sendSmsBatchExamplePayload } from "../../examplePayloads";
import { sendSmsBatchInputs } from "../../inputs";
import { sendSmsBatchOutputSchema } from "../../outputSchemas";
export const sendSmsBatch = action({
  examplePayload: sendSmsBatchExamplePayload,
  display: {
    label: "Send SMS Batch",
    description:
      "Send a transactional SMS to multiple recipients in a single batch request.",
  },
  inputs: sendSmsBatchInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: sendSmsBatchOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, smsDefinitionKey, smsBatchRecipients },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const body = {
      definitionKey: smsDefinitionKey,
      recipients: smsBatchRecipients,
    };
    const { data } = await client.post(SMS_MESSAGES_PATH, body);
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: sendSmsBatchExamplePayload.data,
  }),
});
