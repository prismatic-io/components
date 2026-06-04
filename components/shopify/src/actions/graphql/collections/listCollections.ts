import { action } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { MAX_LIMIT } from "../../../constants";
import { listCollectionsExamplePayload as examplePayload } from "../../../examplePayloads";
import { listCollectionsInputs as inputs } from "../../../inputsGql";
import { fetchData } from "../../../util";
import type { Collection } from "../../interfaces/Collection";
import type { PageInfo } from "../../interfaces/PageInfo";
import listCollectionsQuery from "../queries/collections/ListCollections.gql";

export const listCollectionsGql = action({
  display: {
    label: "List Collections",
    description: "Lists all collections.",
  },
  perform: async (context, { shopifyConnection, limit, getAlldata, endCursor }) => {
    const client = getShopifyGraphQlClient(shopifyConnection, undefined, context.debug.enabled);

    const data = await fetchData<Collection>(
      client,
      ["collections"],
      "collections",
      getAlldata,
      listCollectionsQuery,
      {
        first: getAlldata ? MAX_LIMIT : limit,
        cursor: getAlldata ? undefined : endCursor,
      },
    );

    return {
      data: data as Record<"collections", Collection[]> & {
        pageInfo: PageInfo;
      },
    };
  },
  inputs,
  examplePayload,
});
