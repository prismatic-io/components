import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createApplicationExamplePayload as examplePayload } from "../../examplePayloads";
import { createApplicationInputs as inputs } from "../../inputs/application";
import { createApplicationOutputSchema } from "../../outputSchemas";

export const createApplication = action({
  display: {
    label: "Create Application",
    description: "Creates (registers) a new application.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, displayName, additionalProperties },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const payload = {
      displayName,
      ...(additionalProperties || {}),
    };
    const { data } = await client.post(`/applications`, payload);
    return {
      data,
    };
  },
  examplePerform: async (_context, { displayName }) => ({
    data: {
      ...examplePayload.data,
      displayName,
    },
  }),
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createApplicationOutputSchema,
  }),
  examplePayload,
});
