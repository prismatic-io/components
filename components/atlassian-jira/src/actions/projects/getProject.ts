import { action, outputSchema } from "@prismatic-io/spectral";
import { createV3Client } from "../../client";
import { getProjectExamplePayload } from "../../examplePayloads";
import { getProjectInputs } from "../../inputs";
import { getProjectOutputSchema } from "../../outputSchemas";

export const getProject = action({
  display: {
    label: "Get Project",
    description: "Get the information and metadata of a project.",
  },
  performSafety: "safe",
  perform: async (context, params) => {
    const client = await createV3Client(
      params.jiraConnection,
      context.debug.enabled,
    );
    const { data } = await client.get(`/project/${params.projectId}`);
    return { data };
  },
  inputs: getProjectInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getProjectOutputSchema,
  }),
  examplePayload: getProjectExamplePayload,
});
