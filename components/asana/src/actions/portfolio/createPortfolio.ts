import { action } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { portfolioExamplePayload } from "../../examplePayloads";
import { createPortfolioInputs } from "../../inputs";
export const createPortfolio = action({
  display: {
    label: "Create Portfolio",
    description: "Create a new portfolio.",
  },
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
  examplePayload: portfolioExamplePayload,
});
