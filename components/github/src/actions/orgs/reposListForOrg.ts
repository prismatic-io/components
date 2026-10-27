import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { reposListForOrgExamplePayload } from "../../examplePayloads";
import { reposListForOrgInputs } from "../../inputs";
import { reposListForOrgOutputSchema } from "../../outputSchemas";
export const reposListForOrg = action({
  display: {
    label: "List Organization Repositories",
    description: "List organization repositories.",
  },
  examplePayload: reposListForOrgExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: reposListForOrgOutputSchema,
  }),
  performSafety: "safe",
  perform: async (
    context,
    { connection, org, type, sort, direction, pagination },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/orgs/${org}/repos`, {
      params: {
        type,
        sort,
        direction,
        per_page: pagination.perPage,
        page: pagination.page,
      },
    });
    return { data };
  },
  inputs: reposListForOrgInputs,
});
