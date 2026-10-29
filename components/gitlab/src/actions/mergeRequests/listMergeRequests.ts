import { action, outputSchema } from "@prismatic-io/spectral";
import { createGitlabClient } from "../../client";
import { listMergeRequestsExamplePayload } from "../../examplePayloads";
import { listMergeRequestsInputs } from "../../inputs";
import { listMergeRequestsOutputSchema } from "../../outputSchemas";
import { listRecords } from "../../utils";

export const listMergeRequests = action({
  display: {
    label: "List Merge Requests",
    description: "List merge requests in a project, with optional filters.",
  },
  inputs: listMergeRequestsInputs,
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      project,
      fetchAll,
      pagination,
      mergeRequestState,
      sourceBranch,
      targetBranch,
      labels,
      search,
      updatedAfter,
    },
  ) => {
    const client = createGitlabClient(
      connection,
      context.debug.enabled && context.logger,
    );
    const data = await listRecords(
      client,
      `/projects/${project}/merge_requests`,
      { fetchAll, ...pagination },
      {
        state: mergeRequestState,
        source_branch: sourceBranch,
        target_branch: targetBranch,
        labels,
        search,
        updated_after: updatedAfter,
      },
    );
    return { data };
  },
  examplePerform: async (): Promise<{ data: unknown }> =>
    listMergeRequestsExamplePayload,
  examplePayload: listMergeRequestsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listMergeRequestsOutputSchema,
  }),
});
