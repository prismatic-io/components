import { action, outputSchema } from "@prismatic-io/spectral";
import { createGitlabClient } from "../../client";
import { listIssuesExamplePayload } from "../../examplePayloads";
import { listIssuesInputs } from "../../inputs";
import { listIssuesOutputSchema } from "../../outputSchemas";
import { listRecords } from "../../utils";
export const listIssues = action({
  display: {
    label: "List Issues",
    description: "List issues in a project, with optional filters.",
  },
  inputs: listIssuesInputs,
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      project,
      fetchAll,
      pagination,
      issueState,
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
      `/projects/${project}/issues`,
      { fetchAll, ...pagination },
      { state: issueState, labels, search, updated_after: updatedAfter },
    );
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => listIssuesExamplePayload,
  examplePayload: listIssuesExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listIssuesOutputSchema,
  }),
});
