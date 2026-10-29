import { action, outputSchema } from "@prismatic-io/spectral";
import { createGitlabClient } from "../../client";
import { createBranchExamplePayload } from "../../examplePayloads";
import { createBranchInputs } from "../../inputs";
import { createBranchOutputSchema } from "../../outputSchemas";

export const createBranch = action({
  display: {
    label: "Create Branch",
    description: "Create a branch from an existing branch, tag, or commit.",
  },
  inputs: createBranchInputs,
  performSafety: "notAllowed",
  perform: async (context, { connection, project, newBranch, ref }) => {
    const client = createGitlabClient(
      connection,
      context.debug.enabled && context.logger,
    );
    const { data } = await client.post(
      `/projects/${project}/repository/branches`,
      undefined,
      { params: { branch: newBranch, ref } },
    );
    return { data };
  },
  examplePerform: async (): Promise<{ data: unknown }> =>
    createBranchExamplePayload,
  examplePayload: createBranchExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createBranchOutputSchema,
  }),
});
