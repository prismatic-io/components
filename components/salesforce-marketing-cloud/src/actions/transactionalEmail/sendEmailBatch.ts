import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { EMAIL_MESSAGES_PATH } from "../../constants";
import { sendEmailBatchExamplePayload } from "../../examplePayloads";
import { sendEmailBatchInputs } from "../../inputs";

export const sendEmailBatch = action({
  examplePayload: sendEmailBatchExamplePayload,
  display: {
    label: "Send Email Batch",
    description:
      "Send a transactional email to multiple recipients in a single batch request.",
  },
  inputs: sendEmailBatchInputs,
  perform: async (
    context,
    { connection, emailDefinitionKey, batchRecipients },
  ) => {
    const client = createClient(connection, context.debug.enabled);

    const body = {
      definitionKey: emailDefinitionKey,
      recipients: batchRecipients,
    };

    const { data } = await client.post(EMAIL_MESSAGES_PATH, body);

    return { data };
  },
});
