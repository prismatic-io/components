import { action, outputSchema } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { createPortfolioExamplePayload } from "../../examplePayloads";
import { createPortfolioInputs } from "../../inputs";
import { portfolioResponseSchema } from "../../outputSchemas";
export const createPortfolio = action({
  display: {
    label: "Create Portfolio",
    description: "Create a new portfolio.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const { data } = await client.post(`/portfolios`, {
      data: {
        color: params.color,
        name: params.portfolioName,
        public: params.isPublic,
        workspace: params.workspaceId,
      },
    });
    return { data };
  },
  inputs: createPortfolioInputs,
  examplePayload: createPortfolioExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: portfolioResponseSchema,
  }),
});
