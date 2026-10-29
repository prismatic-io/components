import { action, outputSchema } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { MAX_LIMIT } from "../../../constants";
import { listMetafieldsExamplePayload as examplePayload } from "../../../examplePayloads";
import { listMetafieldsInputs as inputs } from "../../../inputsGql";
import { listMetafieldsGqlOutputSchema } from "../../../outputSchemas";
import type { Metafield, PageInfo } from "../../../types";
import { fetchData } from "../../../util";
import listMetafieldsQuery from "../queries/metafields/ListMetafields.gql";

export const listMetafieldsGql = action({
  display: {
    label: "List Metafields",
    description:
      "Lists resource metafields. Note: This action currently utilizes an unstable version of the Shopify Admin GraphQL API and is subject to change.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { shopifyConnection, resource, getAlldata, pagination = {} },
  ) => {
    const client = getShopifyGraphQlClient(
      shopifyConnection,
      "unstable",
      context.debug.enabled,
      context.logger,
    );

    const data = (await fetchData(
      client,
      ["metafields"],
      "metafields",
      getAlldata,
      listMetafieldsQuery,
      {
        first: getAlldata ? MAX_LIMIT : pagination.limit,
        cursor: getAlldata ? undefined : pagination.endCursor,
        resource,
      },
    )) as Record<"metafields", Metafield[]> & { pageInfo: PageInfo };

    return {
      data,
    };
  },
  examplePerform: async () => examplePayload,
  examplePayload,
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listMetafieldsGqlOutputSchema,
  }),
});
