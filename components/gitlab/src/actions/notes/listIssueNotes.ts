import { action, outputSchema } from "@prismatic-io/spectral";
import { createGitlabClient } from "../../client";
import { listIssueNotesExamplePayload } from "../../examplePayloads";
import { listIssueNotesInputs } from "../../inputs";
import { listIssueNotesOutputSchema } from "../../outputSchemas";
import { listRecords } from "../../utils";
export const listIssueNotes = action({
  display: {
    label: "List Issue Notes",
    description: "List the comments and system notes on an issue.",
  },
  inputs: listIssueNotesInputs,
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, project, issueIid, fetchAll, pagination },
  ) => {
    const client = createGitlabClient(
      connection,
      context.debug.enabled && context.logger,
    );
    const data = await listRecords(
      client,
      `/projects/${project}/issues/${issueIid}/notes`,
      { fetchAll, ...pagination },
    );
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => listIssueNotesExamplePayload,
  examplePayload: listIssueNotesExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listIssueNotesOutputSchema,
  }),
});
