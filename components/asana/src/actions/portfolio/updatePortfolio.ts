import { action, outputSchema } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { updatePortfolioExamplePayload } from "../../examplePayloads";
import { updatePortfolioInputs } from "../../inputs";
import { portfolioResponseSchema } from "../../outputSchemas";
export const updatePortfolio = action({
  display: {
    label: "Update Portfolio",
    description: "Update the information and metadata of the given portfolio.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const { data } = await client.put(`/portfolios/${params.portfolioId}`, {
      data: {
        color: params.color,
        name: params.portfolioName,
        public: params.isPublic,
        workspace: params.workspaceId,
      },
    });
    return { data };
  },
  inputs: updatePortfolioInputs,
  examplePayload: updatePortfolioExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: portfolioResponseSchema,
  }),
});
