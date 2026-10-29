import { action, outputSchema } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { MAX_LIMIT } from "../../../constants";
import { listCollectionsExamplePayload as examplePayload } from "../../../examplePayloads";
import { listCollectionsInputs as inputs } from "../../../inputsGql";
import { listCollectionsGqlOutputSchema } from "../../../outputSchemas";
import type { Collection, PageInfo } from "../../../types";
import { fetchData } from "../../../util";
import listCollectionsQuery from "../queries/collections/ListCollections.gql";

export const listCollectionsGql = action({
  display: {
    label: "List Collections",
    description: "Lists all collections.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { shopifyConnection, getAlldata, pagination = {} },
  ) => {
    const client = getShopifyGraphQlClient(
      shopifyConnection,
      undefined,
      context.debug.enabled,
      context.logger,
    );

    const data = await fetchData<Collection>(
      client,
      ["collections"],
      "collections",
      getAlldata,
      listCollectionsQuery,
      {
        first: getAlldata ? MAX_LIMIT : pagination.limit,
        cursor: getAlldata ? undefined : pagination.endCursor,
      },
    );

    return {
      data: data as Record<"collections", Collection[]> & {
        pageInfo: PageInfo;
      },
    };
  },
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listCollectionsGqlOutputSchema,
  }),
  examplePerform: async () => examplePayload,
  examplePayload,
});
