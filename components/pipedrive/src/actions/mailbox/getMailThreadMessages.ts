import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getMailThreadMessagesInputs } from "../../inputs";
import { getMailThreadMessagesExamplePayload } from "../../examplePayloads";
import { getMailThreadMessagesOutputSchema } from "../../outputSchemas";
export const getMailThreadMessages = action({
  display: {
    label: "Get Mail Thread Messages",
    description: "Gets all mail messages of a mail thread.",
  },
  performSafety: "safe",
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `/mailbox/mailThreads/${id}/mailMessages`,
    );
    return { data };
  },
  inputs: getMailThreadMessagesInputs,
  examplePayload: getMailThreadMessagesExamplePayload,
  examplePerform: async () => getMailThreadMessagesExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getMailThreadMessagesOutputSchema,
  }),
});
