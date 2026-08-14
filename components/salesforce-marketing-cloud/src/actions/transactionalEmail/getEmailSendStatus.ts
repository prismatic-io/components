import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { EMAIL_MESSAGES_PATH } from "../../constants";
import { getEmailSendStatusExamplePayload } from "../../examplePayloads";
import { getEmailSendStatusInputs } from "../../inputs";
import { getEmailSendStatusOutputSchema } from "../../outputSchemas";
export const getEmailSendStatus = action({
  examplePayload: getEmailSendStatusExamplePayload,
  display: {
    label: "Get Email Send Status",
    description: "Retrieve the delivery status of a sent transactional email.",
  },
  inputs: getEmailSendStatusInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getEmailSendStatusOutputSchema,
  }),
  performSafety: "safe",
  perform: async (context, { connection, emailMessageKey }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `${EMAIL_MESSAGES_PATH}/${encodeURIComponent(emailMessageKey)}`,
    );
    return { data };
  },
});
