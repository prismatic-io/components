import { action } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { portfolioExamplePayload } from "../../examplePayloads";
import { getPortfolioInputs } from "../../inputs";
export const getPortfolio = action({
  display: {
    label: "Get Portfolio",
    description: "Get the information and metadata of a portfolio.",
  },
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const { data } = await client.get(`/portfolios/${params.portfolioId}`);
    return { data };
  },
  inputs: getPortfolioInputs,
  examplePayload: portfolioExamplePayload,
});
