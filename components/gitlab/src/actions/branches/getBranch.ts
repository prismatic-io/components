import { action, outputSchema } from "@prismatic-io/spectral";
import { createGitlabClient } from "../../client";
import { getBranchExamplePayload } from "../../examplePayloads";
import { getBranchInputs } from "../../inputs";
import { getBranchOutputSchema } from "../../outputSchemas";
export const getBranch = action({
  display: {
    label: "Get Branch",
    description: "Retrieve a branch and its latest commit.",
  },
  inputs: getBranchInputs,
  performSafety: "safe",
  perform: async (context, { connection, project, branch }) => {
    const client = createGitlabClient(
      connection,
      context.debug.enabled && context.logger,
    );
    const { data } = await client.get(
      `/projects/${project}/repository/branches/${branch}`,
    );
    return { data };
  },
  examplePayload: getBranchExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getBranchOutputSchema,
  }),
});
