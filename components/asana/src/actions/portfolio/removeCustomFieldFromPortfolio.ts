import { action } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { removeCustomFieldFromPortfolioExamplePayload } from "../../examplePayloads";
import { removeCustomFieldFromPortfolioInputs } from "../../inputs";
export const removeCustomFieldFromPortfolio = action({
  display: {
    label: "Remove Custom Field from Portfolio",
    description: "Remove a custom field from an existing portfolio.",
  },
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
});
