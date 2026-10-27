import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { issuesCreateCommentExamplePayload } from "../../examplePayloads";
import { issuesCreateCommentInputs } from "../../inputs";
import { issuesCreateCommentOutputSchema } from "../../outputSchemas";
export const issuesCreateComment = action({
  display: {
    label: "Create Issue Comment",
    description: "Create an issue comment.",
  },
  examplePayload: issuesCreateCommentExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: issuesCreateCommentOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, owner, repo, issueNumber, body }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(
      `/repos/${owner}/${repo}/issues/${issueNumber}/comments`,
      { body },
    );
    return { data };
  },
  examplePerform: async (_context, { body }) => ({
    data: {
      ...issuesCreateCommentExamplePayload.data,
      body,
    },
  }),
  inputs: issuesCreateCommentInputs,
});
