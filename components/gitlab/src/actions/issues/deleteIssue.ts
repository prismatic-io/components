import { action, outputSchema } from "@prismatic-io/spectral";
import { createGitlabClient } from "../../client";
import { ISSUE_DELETED_MESSAGE } from "../../constants";
import { deleteIssueExamplePayload } from "../../examplePayloads";
import { deleteIssueInputs } from "../../inputs";
import { deleteIssueOutputSchema } from "../../outputSchemas";
export const deleteIssue = action({
  display: {
    label: "Delete Issue",
    description:
      "Delete an issue. Users with the Planner or Owner role can delete any issue; other project members can delete the issues they authored.",
  },
  inputs: deleteIssueInputs,
  performSafety: "notAllowed",
  perform: async (context, { connection, project, issueIid }) => {
    const client = createGitlabClient(
      connection,
      context.debug.enabled && context.logger,
    );
    await client.delete(`/projects/${project}/issues/${issueIid}`);
    return {
      data: { success: true, message: ISSUE_DELETED_MESSAGE },
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => deleteIssueExamplePayload,
  examplePayload: deleteIssueExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteIssueOutputSchema,
  }),
});
