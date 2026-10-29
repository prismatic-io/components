import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { issuesListCommentsExamplePayload } from "../../examplePayloads";
import { issuesListCommentsInputs } from "../../inputs";
import { issuesListCommentsOutputSchema } from "../../outputSchemas";

export const issuesListComments = action({
  display: {
    label: "List Issue Comments",
    description: "List issue comments.",
  },
  examplePayload: issuesListCommentsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: issuesListCommentsOutputSchema,
  }),
  performSafety: "safe",
  perform: async (
    context,
    { connection, owner, repo, issueNumber, since, pagination },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/issues/${issueNumber}/comments`,
      {
        params: {
          since,
          per_page: pagination.perPage,
          page: pagination.page,
        },
      },
    );
    return { data };
  },
  inputs: issuesListCommentsInputs,
});
