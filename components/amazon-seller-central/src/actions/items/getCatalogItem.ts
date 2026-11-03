import { action, outputSchema, PerformSafety } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getCatalogItemExamplePayload } from "../../examplePayloads/catalog";
import { getCatalogItemInputs } from "../../inputs";
import { getCatalogItemOutputSchema } from "../../outputSchemas";

export const getCatalogItem = action({
  display: {
    label: "Get Catalog Item",
    description: "Retrieves details for an item in the Amazon catalog.",
  },
  examplePayload: getCatalogItemExamplePayload,
  inputs: getCatalogItemInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getCatalogItemOutputSchema,
  }),
  performSafety: PerformSafety.SAFE,
  perform: async (
    context,
    { connectionInput, marketplaceIds, asin, includedData, locale },
  ) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data } = await client.get(`/catalog/2022-04-01/items/${asin}`, {
      params: {
        marketplaceIds: marketplaceIds || undefined,
        includedData: includedData || undefined,
        locale: locale || undefined,
      },
    });
    return {
      data,
    };
  },
  examplePerform: async () => getCatalogItemExamplePayload,
});
