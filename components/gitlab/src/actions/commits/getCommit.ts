import { action, outputSchema } from "@prismatic-io/spectral";
import { createGitlabClient } from "../../client";
import { getCommitExamplePayload } from "../../examplePayloads";
import { getCommitInputs } from "../../inputs";
import { getCommitOutputSchema } from "../../outputSchemas";
export const getCommit = action({
  display: {
    label: "Get Commit",
    description: "Retrieve a commit with its change statistics.",
  },
  inputs: getCommitInputs,
  performSafety: "safe",
  perform: async (context, { connection, project, commitSha }) => {
    const client = createGitlabClient(
      connection,
      context.debug.enabled && context.logger,
    );
    const { data } = await client.get(
      `/projects/${project}/repository/commits/${commitSha}`,
      {
        params: { stats: true },
      },
    );
    return { data };
  },
  examplePayload: getCommitExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getCommitOutputSchema,
  }),
});
