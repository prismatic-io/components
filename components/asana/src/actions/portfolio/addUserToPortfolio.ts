import { action } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { addUserToPortfolioExamplePayload } from "../../examplePayloads";
import { addUserToPortfolioInputs } from "../../inputs";
export const addUserToPortfolio = action({
  display: {
    label: "Add Users to Portfolio",
    description: "Add existing users to the given portfolio.",
  },
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const { data } = await client.post(
      `/portfolios/${params.portfolioId}/addMembers`,
      {
        data: {
          members: params.members,
        },
      },
    );
    return { data };
  },
  inputs: addUserToPortfolioInputs,
  examplePayload: addUserToPortfolioExamplePayload,
});
