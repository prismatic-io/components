import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getCatalogItemExamplePayload } from "../../examplePayloads/catalog";
import {
  asin,
  connectionInput,
  includedData,
  locale,
  MarketplaceIds,
} from "../../inputs";

export const getCatalogItem = action({
  display: {
    label: "Get Catalog Item",
    description: "Retrieves details for an item in the Amazon catalog.",
  },
  examplePayload: getCatalogItemExamplePayload,
  inputs: {
    connectionInput,
    asin,
    marketplaceIds: MarketplaceIds,
    includedData,
    locale,
  },
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
});
