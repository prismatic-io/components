import { action, outputSchema } from "@prismatic-io/spectral";
import { createGitlabClient } from "../../client";
import { BRANCH_DELETED_MESSAGE } from "../../constants";
import { deleteBranchExamplePayload } from "../../examplePayloads";
import { deleteBranchInputs } from "../../inputs";
import { deleteBranchOutputSchema } from "../../outputSchemas";

export const deleteBranch = action({
  display: {
    label: "Delete Branch",
    description: "Delete a branch. Protected branches cannot be deleted.",
  },
  inputs: deleteBranchInputs,
  performSafety: "notAllowed",
  perform: async (context, { connection, project, branch }) => {
    const client = createGitlabClient(
      connection,
      context.debug.enabled && context.logger,
    );
    await client.delete(`/projects/${project}/repository/branches/${branch}`);
    return {
      data: { success: true, message: BRANCH_DELETED_MESSAGE },
    };
  },
  examplePerform: async (): Promise<{ data: unknown }> =>
    deleteBranchExamplePayload,
  examplePayload: deleteBranchExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteBranchOutputSchema,
  }),
});
