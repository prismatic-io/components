import { action, outputSchema, PerformSafety } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { searchCatalogItemExamplePayload } from "../../examplePayloads/catalog";
import { searchCatalogItemInputs } from "../../inputs";
import { searchCatalogItemOutputSchema } from "../../outputSchemas";

export const searchCatalogItem = action({
  display: {
    label: "Search Catalog Items",
    description:
      "Search for and return a list of Amazon catalog items and associated information either by identifier or by keywords.",
  },
  examplePayload: searchCatalogItemExamplePayload,
  inputs: searchCatalogItemInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: searchCatalogItemOutputSchema,
  }),
  performSafety: PerformSafety.NOT_ALLOWED,
  perform: async (
    context,
    {
      connectionInput,
      marketplaceIds,
      identifiers,
      identifiersType,
      includedData,
      locale,
      sellerId,
      keywords,
      brandNames,
      classificationsIds,
      keywordsLocale,
      pagination,
    },
  ) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data } = await client.get("/catalog/2022-04-01/items", {
      params: {
        marketplaceIds: marketplaceIds || undefined,
        identifiers: identifiers || undefined,
        identifiersType: identifiersType || undefined,
        includedData: includedData || undefined,
        locale: locale || undefined,
        sellerId: sellerId || undefined,
        keywords: keywords || undefined,
        brandNames: brandNames || undefined,
        classificationsIds: classificationsIds || undefined,
        pageSize: pagination.pageSize || undefined,
        pageToken: pagination.pageToken || undefined,
        keywordsLocale: keywordsLocale || undefined,
      },
    });
    return {
      data,
    };
  },
  examplePerform: async () => searchCatalogItemExamplePayload,
});
