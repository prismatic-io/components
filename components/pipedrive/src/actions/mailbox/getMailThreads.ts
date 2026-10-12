import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getMailThreadsInputs } from "../../inputs";
import { getMailThreadsExamplePayload } from "../../examplePayloads";
import { getMailThreadsOutputSchema } from "../../outputSchemas";
export const getMailThreads = action({
  display: {
    label: "Get Mail Threads",
    description: "Gets mail threads.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, folder, pagination: { start, limit } = {} },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get("/mailbox/mailThreads", {
      params: { folder, start, limit },
    });
    return { data };
  },
  inputs: getMailThreadsInputs,
  examplePayload: getMailThreadsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getMailThreadsOutputSchema,
  }),
});
