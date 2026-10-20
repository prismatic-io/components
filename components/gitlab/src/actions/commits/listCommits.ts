import { action, outputSchema } from "@prismatic-io/spectral";
import { createGitlabClient } from "../../client";
import { listCommitsExamplePayload } from "../../examplePayloads";
import { listCommitsInputs } from "../../inputs";
import { listCommitsOutputSchema } from "../../outputSchemas";
import { listRecords } from "../../utils";
export const listCommits = action({
  display: {
    label: "List Commits",
    description:
      "List commits in a project's repository, with optional filters.",
  },
  inputs: listCommitsInputs,
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, project, fetchAll, pagination, refName, since, until, path },
  ) => {
    const client = createGitlabClient(
      connection,
      context.debug.enabled && context.logger,
    );
    const data = await listRecords(
      client,
      `/projects/${project}/repository/commits`,
      { fetchAll, ...pagination },
      { ref_name: refName, since, until, path },
    );
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => listCommitsExamplePayload,
  examplePayload: listCommitsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listCommitsOutputSchema,
  }),
});
