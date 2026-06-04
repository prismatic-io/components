import { action } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { MAX_LIMIT } from "../../../constants";
import { listVariantsExamplePayload as examplePayload } from "../../../examplePayloads";
import { listVariantsInputs as inputs } from "../../../inputsGql";
import { fetchData } from "../../../util";
import type { PageInfo } from "../../interfaces/PageInfo";
import listVariantsQuery from "../queries/variants/ListVariants.gql";

export const listVariantsGql = action({
  display: {
    label: "List Variants",
    description: "Lists all variants for the specified product.",
  },
  perform: async (context, { shopifyConnection, productId, getAlldata, limit, endCursor }) => {
    const client = getShopifyGraphQlClient(shopifyConnection, undefined, context.debug.enabled);
    const data = (await fetchData(
      client,
      ["productVariants"],
      "productVariants",
      getAlldata,
      listVariantsQuery,
      {
        query: `product_id:${productId}`,
        first: getAlldata ? MAX_LIMIT : limit,
        cursor: getAlldata ? undefined : endCursor,
      },
    )) as Record<"productVariants", unknown[]> & { pageInfo: PageInfo };

    return {
      data,
    };
  },
  examplePayload,
  inputs,
});
