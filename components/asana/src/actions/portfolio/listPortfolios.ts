import { action } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { listPortfoliosExamplePayload } from "../../examplePayloads";
import { listPortfoliosInputs } from "../../inputs";
export const listPortfolios = action({
  display: {
    label: "List Portfolios",
    description: "List portfolios that the authenticated user owns.",
  },
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
        workspace: params.workspaceId || undefined,
        owner: userGid,
      },
    });
    return { data };
  },
  inputs: listPortfoliosInputs,
  examplePayload: listPortfoliosExamplePayload,
});
