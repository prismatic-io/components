import { action, outputSchema } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { MAX_LIMIT } from "../../../constants";
import { listDraftOrdersExamplePayload } from "../../../examplePayloads";
import { listDraftOrdersInputs as inputs } from "../../../inputsGql";
import { listDraftOrdersGqlOutputSchema } from "../../../outputSchemas";
import type { DraftOrder } from "../../../types";
import { draftOrderMapper, fetchData, paginationMapper } from "../../../util";
import listDraftOrdersQuery from "../queries/draftOrders/ListDraftOrders.gql";

export const listDraftOrdersGql = action({
  display: {
    label: "List Draft Orders",
    description: "Lists all draft orders.",
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
    const data = await fetchData<DraftOrder>(
      client,
      ["draftOrders"],
      "draftOrders",
      getAlldata,
      listDraftOrdersQuery,
      {
        first: getAlldata ? MAX_LIMIT : pagination.limit,
        cursor: getAlldata ? undefined : pagination.endCursor,
      },
    );
    return {
      data: {
        data: {
          draft_orders: data.draftOrders.map(draftOrderMapper),
        },
        ...paginationMapper(data.pageInfo),
      },
    };
  },

  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listDraftOrdersGqlOutputSchema,
  }),
  examplePerform: async () => listDraftOrdersExamplePayload.restMap,
  examplePayload: listDraftOrdersExamplePayload.restMap,
});
