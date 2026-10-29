import { action, outputSchema } from "@prismatic-io/spectral";
import { createGitlabClient } from "../../client";
import { listBranchesExamplePayload } from "../../examplePayloads";
import { listBranchesInputs } from "../../inputs";
import { listBranchesOutputSchema } from "../../outputSchemas";
import { listRecords } from "../../utils";

export const listBranches = action({
  display: {
    label: "List Branches",
    description: "List the branches in a project's repository.",
  },
  inputs: listBranchesInputs,
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, project, fetchAll, pagination, search },
  ) => {
    const client = createGitlabClient(
      connection,
      context.debug.enabled && context.logger,
    );
    const data = await listRecords(
      client,
      `/projects/${project}/repository/branches`,
      { fetchAll, ...pagination },
      { search },
    );
    return { data };
  },
  examplePerform: async (): Promise<{ data: unknown }> =>
    listBranchesExamplePayload,
  examplePayload: listBranchesExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listBranchesOutputSchema,
  }),
});
