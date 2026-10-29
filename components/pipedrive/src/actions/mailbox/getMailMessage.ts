import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getMailMessageInputs } from "../../inputs";
import { getMailMessageExamplePayload } from "../../examplePayloads";
import { getMailMessageOutputSchema } from "../../outputSchemas";

export const getMailMessage = action({
  display: {
    label: "Get Mail Message",
    description: "Gets one mail message.",
  },
  performSafety: "safe",
  perform: async (context, { connection, id, includeBody }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/mailbox/mailMessages/${id}`, {
      params: { include_body: includeBody },
    });
    return { data };
  },
  inputs: getMailMessageInputs,
  examplePayload: getMailMessageExamplePayload,
  examplePerform: async () => getMailMessageExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getMailMessageOutputSchema,
  }),
});
