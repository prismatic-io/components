import { action, outputSchema, PerformSafety } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getListingsItemExamplePayload } from "../../examplePayloads/catalog";
import { getListingsItemInputs } from "../../inputs";
import { getListingsItemOutputSchema } from "../../outputSchemas";

export const getListingsItem = action({
  display: {
    label: "Get Listings Item",
    description: "Returns details about a listings item for a selling partner.",
  },
  examplePayload: getListingsItemExamplePayload,
  inputs: getListingsItemInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getListingsItemOutputSchema,
  }),
  performSafety: PerformSafety.SAFE,
  perform: async (
    context,
    {
      connectionInput,
      sellerId,
      sku,
      marketplaceIds,
      issueLocale,
      includedData,
    },
  ) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data } = await client.get(
      `/listings/2021-08-01/items/${sellerId}/${sku}`,
      {
        params: {
          marketplaceIds: marketplaceIds || undefined,
          includedData: includedData || undefined,
          issueLocale: issueLocale || undefined,
        },
      },
    );
    return {
      data,
    };
  },
  examplePerform: async () => getListingsItemExamplePayload,
});
