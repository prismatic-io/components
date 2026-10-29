import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateListingsItemExamplePayload } from "../../examplePayloads/catalog";
import {
  connectionInput,
  issueLocale,
  MarketplaceIds,
  patches,
  productType,
  sellerId,
  sku,
} from "../../inputs";

export const updateListingsItem = action({
  display: {
    label: "Update Listings Item",
    description:
      "Partially update (patch) a listings item for a selling partner.",
  },
  examplePayload: updateListingsItemExamplePayload,
  inputs: {
    connectionInput,
    sellerId,
    sku,
    marketplaceIds: MarketplaceIds,
    productType,
    issueLocale,
    patches,
  },
  perform: async (
    context,
    {
      connectionInput,
      sellerId,
      sku,
      marketplaceIds,
      productType,
      issueLocale,
      patches,
    },
  ) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data } = await client.patch(
      `/listings/2021-08-01/items/${sellerId}/${sku}`,
      {
        productType: productType || undefined,
        patches: patches || undefined,
      },
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
