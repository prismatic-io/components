import { action, outputSchema } from "@prismatic-io/spectral";
import { createGitlabClient } from "../../client";
import { listPipelinesExamplePayload } from "../../examplePayloads";
import { listPipelinesInputs } from "../../inputs";
import { listPipelinesOutputSchema } from "../../outputSchemas";
import { listRecords } from "../../utils";
export const listPipelines = action({
  display: {
    label: "List Pipelines",
    description: "List CI/CD pipelines in a project, with optional filters.",
  },
  inputs: listPipelinesInputs,
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      project,
      fetchAll,
      pagination,
      refName,
      pipelineStatus,
      updatedAfter,
    },
  ) => {
    const client = createGitlabClient(
      connection,
      context.debug.enabled && context.logger,
    );
    const data = await listRecords(
      client,
      `/projects/${project}/pipelines`,
      { fetchAll, ...pagination },
      { ref: refName, status: pipelineStatus, updated_after: updatedAfter },
    );
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => listPipelinesExamplePayload,
  examplePayload: listPipelinesExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listPipelinesOutputSchema,
  }),
});
