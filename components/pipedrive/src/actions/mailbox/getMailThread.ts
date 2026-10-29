import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getMailThreadInputs } from "../../inputs";
import { getMailThreadExamplePayload } from "../../examplePayloads";
import { getMailThreadOutputSchema } from "../../outputSchemas";

export const getMailThread = action({
  display: {
    label: "Get Mail Thread",
    description: "Gets one mail thread.",
  },
  performSafety: "safe",
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/mailbox/mailThreads/${id}`);
    return { data };
  },
  inputs: getMailThreadInputs,
  examplePayload: getMailThreadExamplePayload,
  examplePerform: async () => getMailThreadExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getMailThreadOutputSchema,
  }),
});
