import { action, outputSchema } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { deletePortfolioExamplePayload } from "../../examplePayloads";
import { deletePortfolioInputs } from "../../inputs";
import { emptyResponseOutputSchema } from "../../outputSchemas";
export const deletePortfolio = action({
  display: {
    label: "Delete Portfolio",
    description: "Delete an existing portfolio.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const { data } = await client.delete(`/portfolios/${params.portfolioId}`);
    return { data };
  },
  inputs: deletePortfolioInputs,
  examplePayload: deletePortfolioExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: emptyResponseOutputSchema,
  }),
});
