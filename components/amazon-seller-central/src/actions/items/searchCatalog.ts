import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { searchCatalogItemExamplePayload } from "../../examplePayloads/catalog";
import {
  brandNames,
  classificationsIds,
  connectionInput,
  identifiers,
  identifiersType,
  includedData,
  keywords,
  keywordsLocale,
  locale,
  MarketplaceIds,
  pageSize,
  pageToken,
  sellerId,
} from "../../inputs";

export const searchCatalogItem = action({
  display: {
    label: "Search Catalog Item",
    description:
      "Search for and return a list of Amazon catalog items and associated information either by identifier or by keywords.",
  },
  examplePayload: searchCatalogItemExamplePayload,
  inputs: {
    connectionInput,
    marketplaceIds: MarketplaceIds,
    identifiers,
    identifiersType,
    includedData,
    locale,
    sellerId,
    keywords,
    brandNames,
    classificationsIds,
    pageSize,
    pageToken,
    keywordsLocale,
  },
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
      pageSize,
      pageToken,
      keywordsLocale,
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
        pageSize: pageSize || undefined,
        pageToken: pageToken || undefined,
        keywordsLocale: keywordsLocale || undefined,
      },
    });
    return {
      data,
    };
  },
});
