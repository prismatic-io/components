import { action } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { removeUserFromPortfolioExamplePayload } from "../../examplePayloads";
import { removeUserFromPortfolioInputs } from "../../inputs";
export const removeUserFromPortfolio = action({
  display: {
    label: "Remove Users from Portfolio",
    description: "Remove existing users from the given portfolio.",
  },
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const { data } = await client.post(
      `/portfolios/${params.portfolioId}/removeMembers`,
      {
        data: {
          members: params.members,
        },
      },
      {
        params: {
          opt_fields: params.optFields,
        },
      },
    );
    return { data };
  },
  inputs: removeUserFromPortfolioInputs,
  examplePayload: removeUserFromPortfolioExamplePayload,
});
