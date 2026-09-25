import { action, outputSchema } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { getPortfolioExamplePayload } from "../../examplePayloads";
import { getPortfolioInputs } from "../../inputs";
import { portfolioResponseSchema } from "../../outputSchemas";
export const getPortfolio = action({
  display: {
    label: "Get Portfolio",
    description: "Get the information and metadata of a portfolio.",
  },
  performSafety: "safe",
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const { data } = await client.get(`/portfolios/${params.portfolioId}`);
    return { data };
  },
  inputs: getPortfolioInputs,
  examplePayload: getPortfolioExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: portfolioResponseSchema,
  }),
});
