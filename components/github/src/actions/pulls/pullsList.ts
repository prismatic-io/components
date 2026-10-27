import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { pullsListExamplePayload } from "../../examplePayloads";
import { pullsListInputs } from "../../inputs";
import { pullsListOutputSchema } from "../../outputSchemas";
export const pullsList = action({
  display: {
    label: "List Pull Requests",
    description: "List pull requests.",
  },
  examplePayload: pullsListExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: pullsListOutputSchema,
  }),
  performSafety: "safe",
  perform: async (
    context,
    { connection, owner, repo, state, head, base, sort, direction, pagination },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/repos/${owner}/${repo}/pulls`, {
      params: {
        state,
        head,
        base,
        sort,
        direction,
        per_page: pagination.perPage,
        page: pagination.page,
      },
    });
    return { data };
  },
  inputs: pullsListInputs,
});
