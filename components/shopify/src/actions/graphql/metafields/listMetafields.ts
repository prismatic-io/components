import { action } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { MAX_LIMIT } from "../../../constants";
import { listMetafieldsExamplePayload as examplePayload } from "../../../examplePayloads";
import { listMetafieldsInputs as inputs } from "../../../inputsGql";
import { fetchData } from "../../../util";
import type { Metafield } from "../../interfaces/Metafield";
import type { PageInfo } from "../../interfaces/PageInfo";
import listMetafieldsQuery from "../queries/metafields/ListMetafields.gql";

export const listMetafieldsGql = action({
  display: {
    label: "List Metafields",
    description:
      "Lists resource metafields. Note: This action currently utilizes an unstable version of the Shopify Admin GraphQL API and is subject to change.",
  },
  perform: async (context, { shopifyConnection, resource, getAlldata, endCursor, limit }) => {
    const client = getShopifyGraphQlClient(shopifyConnection, "unstable", context.debug.enabled);

    const data = (await fetchData(
      client,
      ["metafields"],
      "metafields",
      getAlldata,
      listMetafieldsQuery,
      {
        first: getAlldata ? MAX_LIMIT : limit,
        cursor: getAlldata ? undefined : endCursor,
        resource,
      },
    )) as Record<"metafields", Metafield[]> & { pageInfo: PageInfo };

    return {
      data,
    };
  },
  examplePayload,
  inputs,
});
