import { action, outputSchema } from "@prismatic-io/spectral";
import { createGitlabClient } from "../../client";
import { createMergeRequestExamplePayload } from "../../examplePayloads";
import { createMergeRequestInputs } from "../../inputs";
import { createMergeRequestOutputSchema } from "../../outputSchemas";
export const createMergeRequest = action({
  display: {
    label: "Create Merge Request",
    description: "Create a merge request between two branches.",
  },
  inputs: createMergeRequestInputs,
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      project,
      sourceBranch,
      targetBranch,
      title,
      labels,
      assigneeIds,
      additionalFields,
    },
  ) => {
    const client = createGitlabClient(
      connection,
      context.debug.enabled && context.logger,
    );
    const { data } = await client.post(`/projects/${project}/merge_requests`, {
      source_branch: sourceBranch,
      target_branch: targetBranch,
      title,
      description: additionalFields?.description,
      labels,
      assignee_ids: assigneeIds,
      remove_source_branch: additionalFields?.removeSourceBranch,
      squash: additionalFields?.squash,
    });
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => createMergeRequestExamplePayload,
  examplePayload: createMergeRequestExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createMergeRequestOutputSchema,
  }),
});
