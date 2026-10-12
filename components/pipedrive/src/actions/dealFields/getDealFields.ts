import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getDealFieldsInputs } from "../../inputs";
import { getDealFieldsExamplePayload } from "../../examplePayloads";
import { getDealFieldsOutputSchema } from "../../outputSchemas";
export const getDealFields = action({
  display: {
    label: "Get Deal Fields",
    description: "Gets all deal fields.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, pagination: { start, limit } = {} },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get("/dealFields", {
      params: { start, limit },
    });
    return { data };
  },
  inputs: getDealFieldsInputs,
  examplePayload: getDealFieldsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getDealFieldsOutputSchema,
  }),
});
