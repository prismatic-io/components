import { action } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { removePortfolioItemExamplePayload } from "../../examplePayloads";
import { removePortfolioItemInputs } from "../../inputs";
export const removePortfolioItem = action({
  display: {
    label: "Remove Portfolio Item",
    description: "Remove an existing item from the given portfolio.",
  },
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const { data } = await client.delete(
      `/portfolios/${params.portfolioId}/removeItem`,
      {
        data: {
          item: params.itemId,
        },
      },
    );
    return { data };
  },
  inputs: removePortfolioItemInputs,
  examplePayload: removePortfolioItemExamplePayload,
});
