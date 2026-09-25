import { action, outputSchema } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { listPortfoliosExamplePayload } from "../../examplePayloads";
import { listPortfoliosInputs } from "../../inputs";
import { listPortfoliosOutputSchema } from "../../outputSchemas";
export const listPortfolios = action({
  display: {
    label: "List Portfolios",
    description: "List portfolios that the authenticated user owns.",
  },
  performSafety: "safe",
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const {
      data: {
        data: { gid: userGid },
      },
    } = await client.get("/users/me");
    const { data } = await client.get(`/portfolios`, {
      params: {
        offset: params.pagination.offset,
        limit: params.pagination.limit,
        workspace: params.workspaceId,
        owner: userGid,
      },
    });
    return { data };
  },
  inputs: listPortfoliosInputs,
  examplePayload: listPortfoliosExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listPortfoliosOutputSchema,
  }),
});
