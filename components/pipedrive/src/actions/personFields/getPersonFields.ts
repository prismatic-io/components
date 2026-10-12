import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getPersonFieldsInputs } from "../../inputs";
import { getPersonFieldsExamplePayload } from "../../examplePayloads";
import { getPersonFieldsOutputSchema } from "../../outputSchemas";
export const getPersonFields = action({
  display: {
    label: "Get Person Fields",
    description: "Gets all person fields.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, pagination: { start, limit } = {} },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get("/personFields", {
      params: { start, limit },
    });
    return { data };
  },
  inputs: getPersonFieldsInputs,
  examplePayload: getPersonFieldsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getPersonFieldsOutputSchema,
  }),
});
