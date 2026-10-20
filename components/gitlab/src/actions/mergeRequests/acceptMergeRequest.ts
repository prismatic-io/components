import { action, outputSchema } from "@prismatic-io/spectral";
import { createGitlabClient } from "../../client";
import { acceptMergeRequestExamplePayload } from "../../examplePayloads";
import { acceptMergeRequestInputs } from "../../inputs";
import { acceptMergeRequestOutputSchema } from "../../outputSchemas";
export const acceptMergeRequest = action({
  display: {
    label: "Accept Merge Request",
    description:
      "Merge a merge request. Fails if the merge request is not mergeable or the SHA guard does not match.",
  },
  inputs: acceptMergeRequestInputs,
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, project, mergeRequestIid, mergeOptions },
  ) => {
    const client = createGitlabClient(
      connection,
      context.debug.enabled && context.logger,
    );
    const { data } = await client.put(
      `/projects/${project}/merge_requests/${mergeRequestIid}/merge`,
      {
        merge_commit_message: mergeOptions?.mergeCommitMessage,
        squash: mergeOptions?.squash,
        should_remove_source_branch: mergeOptions?.shouldRemoveSourceBranch,
        sha: mergeOptions?.sha,
      },
    );
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => acceptMergeRequestExamplePayload,
  examplePayload: acceptMergeRequestExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: acceptMergeRequestOutputSchema,
  }),
});
