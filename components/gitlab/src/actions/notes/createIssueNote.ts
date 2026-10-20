import { action, outputSchema } from "@prismatic-io/spectral";
import { createGitlabClient } from "../../client";
import { createIssueNoteExamplePayload } from "../../examplePayloads";
import { createIssueNoteInputs } from "../../inputs";
import { createIssueNoteOutputSchema } from "../../outputSchemas";
export const createIssueNote = action({
  display: {
    label: "Create Issue Note",
    description: "Add a comment to an issue.",
  },
  inputs: createIssueNoteInputs,
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, project, issueIid, body, internal },
  ) => {
    const client = createGitlabClient(
      connection,
      context.debug.enabled && context.logger,
    );
    const { data } = await client.post(
      `/projects/${project}/issues/${issueIid}/notes`,
      {
        body,
        internal,
      },
    );
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => createIssueNoteExamplePayload,
  examplePayload: createIssueNoteExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createIssueNoteOutputSchema,
  }),
});
