import { action, outputSchema } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { removeCustomFieldFromPortfolioExamplePayload } from "../../examplePayloads";
import { removeCustomFieldFromPortfolioInputs } from "../../inputs";
import { emptyResponseOutputSchema } from "../../outputSchemas";
export const removeCustomFieldFromPortfolio = action({
  display: {
    label: "Remove Custom Field from Portfolio",
    description: "Remove a custom field from an existing portfolio.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const { data } = await client.post(
      `/portfolios/${params.portfolioId}/removeCustomFieldSetting`,
      {
        data: {
          custom_field: params.fieldId,
        },
      },
    );
    return { data };
  },
  inputs: removeCustomFieldFromPortfolioInputs,
  examplePayload: removeCustomFieldFromPortfolioExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: emptyResponseOutputSchema,
  }),
});
