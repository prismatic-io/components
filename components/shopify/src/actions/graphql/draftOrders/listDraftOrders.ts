import { action } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { MAX_LIMIT } from "../../../constants";
import { listDraftOrdersExamplePayload } from "../../../examplePayloads";
import { listDraftOrdersInputs as inputs } from "../../../inputsGql";
import { fetchData } from "../../../util";

import type { DraftOrder } from "../../interfaces/DraftOrder";
import { draftOrderMapper } from "../mappers/draftOrderMapper";
import { paginationMapper } from "../mappers/paginationMapper";
import listDraftOrdersQuery from "../queries/draftOrders/ListDraftOrders.gql";

export const listDraftOrdersGql = action({
  display: {
    label: "List Draft Orders",
    description: "Lists all draft orders.",
  },
  perform: async (context, { shopifyConnection, limit, getAlldata, endCursor }) => {
    const client = getShopifyGraphQlClient(shopifyConnection, undefined, context.debug.enabled);
    const data = await fetchData<DraftOrder>(
      client,
      ["draftOrders"],
      "draftOrders",
      getAlldata,
      listDraftOrdersQuery,
      {
        first: getAlldata ? MAX_LIMIT : limit,
        cursor: getAlldata ? undefined : endCursor,
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
  examplePayload: listDraftOrdersExamplePayload.restMap,
});
