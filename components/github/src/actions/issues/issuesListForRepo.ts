import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { issuesListForRepoExamplePayload } from "../../examplePayloads";
import { issuesListForRepoInputs } from "../../inputs";
import type { Issue } from "../../interfaces/Issue";
import { issuesListForRepoOutputSchema } from "../../outputSchemas";
import { paginateResults } from "../../utils";

export const issuesListForRepo = action({
  display: {
    label: "List Repository Issues",
    description: "List repository issues.",
  },
  examplePayload: issuesListForRepoExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: issuesListForRepoOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      owner,
      repo,
      milestone,
      state,
      assignee,
      creator,
      mentioned,
      labels,
      sort,
      direction,
      since,
      pagination,
      fetchAll,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await paginateResults<Issue>(
      client,
      `/repos/${owner}/${repo}/issues`,
      fetchAll,
      {
        milestone,
        state,
        assignee,
        creator,
        mentioned,
        labels,
        sort,
        direction,
        since,
        per_page: pagination.perPage,
        page: pagination.page,
      },
    );
    return { data };
  },
  examplePerform: async () => issuesListForRepoExamplePayload,
  inputs: issuesListForRepoInputs,
});
