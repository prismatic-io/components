import { action, outputSchema } from "@prismatic-io/spectral";
import { createGitlabClient } from "../../client";
import { getPipelineExamplePayload } from "../../examplePayloads";
import { getPipelineInputs } from "../../inputs";
import { getPipelineOutputSchema } from "../../outputSchemas";
export const getPipeline = action({
  display: {
    label: "Get Pipeline",
    description:
      "Retrieve a CI/CD pipeline with its timing and triggering user.",
  },
  inputs: getPipelineInputs,
  performSafety: "safe",
  perform: async (context, { connection, project, pipelineId }) => {
    const client = createGitlabClient(
      connection,
      context.debug.enabled && context.logger,
    );
    const { data } = await client.get(
      `/projects/${project}/pipelines/${pipelineId}`,
    );
    return { data };
  },
  examplePayload: getPipelineExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getPipelineOutputSchema,
  }),
});
