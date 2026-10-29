import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getUserCallLogsInputs } from "../../inputs";
import { getUserCallLogsExamplePayload } from "../../examplePayloads";
import { getUserCallLogsOutputSchema } from "../../outputSchemas";

export const getUserCallLogs = action({
  display: {
    label: "Get User Call Logs",
    description: "Gets all call logs assigned to a particular user.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, pagination: { start, limit } = {} },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get("/callLogs", {
      params: { start, limit },
    });
    return { data };
  },
  inputs: getUserCallLogsInputs,
  examplePayload: getUserCallLogsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getUserCallLogsOutputSchema,
  }),
});
