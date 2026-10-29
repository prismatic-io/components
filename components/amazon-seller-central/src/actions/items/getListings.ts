import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getListingsItemExamplePayload } from "../../examplePayloads/catalog";
import {
  connectionInput,
  includedData,
  issueLocale,
  MarketplaceIds,
  sellerId,
  sku,
} from "../../inputs";

export const getListingsItem = action({
  display: {
    label: "Get Listings Item",
    description: "Returns details about a listings item for a selling partner.",
  },
  examplePayload: getListingsItemExamplePayload,
  inputs: {
    connectionInput,
    sellerId: {
      ...sellerId,
      required: true,
      comments:
        "A selling partner identifier, such as a merchant account or vendor code.	",
    },
    sku,
    marketplaceIds: MarketplaceIds,
    issueLocale,
    includedData,
  },
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
});
