import { action, outputSchema } from "@prismatic-io/spectral";
import { createV3Client } from "../../client";
import { listIssueWorklogsExamplePayload } from "../../examplePayloads";
import { listIssueWorklogsInputs } from "../../inputs";
import { listIssueWorklogsOutputSchema } from "../../outputSchemas";

export const listIssueWorklogs = action({
  display: {
    label: "List Issue Worklogs",
    description: "Return a list of worklogs for an issue.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = await createV3Client(
      params.jiraConnection,
      context.debug.enabled,
    );
    const { data } = await client.get(`/issue/${params.issueId}/worklog`);
    return { data };
  },
  examplePerform: async () => listIssueWorklogsExamplePayload,
  inputs: listIssueWorklogsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listIssueWorklogsOutputSchema,
  }),
  examplePayload: listIssueWorklogsExamplePayload,
});
