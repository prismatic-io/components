import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getProjectExamplePayload } from "../../examplePayloads";
import { getProjectInputs } from "../../inputs";
import { getProjectOutputSchema } from "../../outputSchemas";
export const getProject = action({
  display: {
    label: "Get Project",
    description: "Retrieve a project by ID.",
  },
  inputs: getProjectInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getProjectOutputSchema,
  }),
  performSafety: "safe",
  perform: async (context, { connection, projectId }) => {
    const client = createClient(connection, "jpm", context.debug.enabled);
    const { data } = await client.get(`/projects/${projectId}`);
    return {
      data,
    };
  },
  examplePayload: getProjectExamplePayload,
});
