import { action } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { listPortfolioItemsExamplePayload } from "../../examplePayloads";
import { listPortfolioItemsInputs } from "../../inputs";
export const listPortfolioItems = action({
  display: {
    label: "List Portfolio Items",
    description: "List all items in a given portfolio.",
  },
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const { data } = await client.get(
      `/portfolios/${params.portfolioId}/items`,
      {
        params: {
          offset: params.pagination.offset,
          limit: params.pagination.limit,
        },
      },
    );
    return { data };
  },
  inputs: listPortfolioItemsInputs,
  examplePayload: listPortfolioItemsExamplePayload,
});
