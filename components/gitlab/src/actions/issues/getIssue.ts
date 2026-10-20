import { action, outputSchema } from "@prismatic-io/spectral";
import { createGitlabClient } from "../../client";
import { getIssueExamplePayload } from "../../examplePayloads";
import { getIssueInputs } from "../../inputs";
import { getIssueOutputSchema } from "../../outputSchemas";
export const getIssue = action({
  display: {
    label: "Get Issue",
    description: "Retrieve an issue in a project by its IID.",
  },
  inputs: getIssueInputs,
  performSafety: "safe",
  perform: async (context, { connection, project, issueIid }) => {
    const client = createGitlabClient(
      connection,
      context.debug.enabled && context.logger,
    );
    const { data } = await client.get(
      `/projects/${project}/issues/${issueIid}`,
    );
    return { data };
  },
  examplePayload: getIssueExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getIssueOutputSchema,
  }),
});
