import { action, outputSchema } from "@prismatic-io/spectral";
import { createGitlabClient } from "../../client";
import { getProjectExamplePayload } from "../../examplePayloads";
import { getProjectInputs } from "../../inputs";
import { getProjectOutputSchema } from "../../outputSchemas";

export const getProject = action({
  display: {
    label: "Get Project",
    description: "Retrieve a project by ID or path.",
  },
  inputs: getProjectInputs,
  performSafety: "safe",
  perform: async (context, { connection, project }) => {
    const client = createGitlabClient(
      connection,
      context.debug.enabled && context.logger,
    );
    const { data } = await client.get(`/projects/${project}`);
    return { data };
  },
  examplePayload: getProjectExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getProjectOutputSchema,
  }),
});
