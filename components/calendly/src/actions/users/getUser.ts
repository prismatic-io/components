import { action, outputSchema } from "@prismatic-io/spectral";
import { getUserOutputSchema } from "../../outputSchemas";
import { getCalendlyClient } from "../../client";
import { getUserInputs } from "../../inputs";
import { getUserExamplePayload } from "../../examplePayloads";
export const getUser = action({
  display: {
    label: "Get User",
    description: "Returns information about a specified User.",
  },
  performSafety: "safe",
  perform: async (context, { connection, uuid }) => {
    const client = getCalendlyClient(connection, context.debug.enabled);
    const { data } = await client.get(`/users/${uuid}`);
    return { data };
  },
  inputs: getUserInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getUserOutputSchema,
  }),
  examplePayload: getUserExamplePayload,
});
