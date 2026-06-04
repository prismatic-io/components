import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteListingsItemExamplePayload } from "../../examplePayloads/catalog";
import {
  connectionInput,
  issueLocale,
  MarketplaceIds,
  sellerId,
  sku,
} from "../../inputs";

export const deleteListingsItem = action({
  display: {
    label: "Delete Listings Item",
    description: "Delete a listings item for a selling partner.",
  },
  examplePayload: deleteListingsItemExamplePayload,
  inputs: {
    connectionInput,
    sellerId,
    sku,
    marketplaceIds: MarketplaceIds,
    issueLocale,
  },
  perform: async (
    context,
    { connectionInput, sellerId, sku, marketplaceIds, issueLocale },
  ) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data } = await client.delete(
      `/listings/2021-08-01/items/${sellerId}/${sku}`,
      {
        params: {
          marketplaceIds: marketplaceIds || undefined,
          issueLocale: issueLocale || undefined,
        },
      },
    );
    return {
      data,
    };
  },
});
