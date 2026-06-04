import { action, util } from "@prismatic-io/spectral";
import { listDraftOrdersExamplePayload } from "../../examplePayloads";
import { listDraftOrdersInputs } from "../../inputs";
import { listDraftOrdersGql } from "../graphql/draftOrders/listDraftOrders";

export const listDraftOrders = action({
  display: { label: "List Draft Orders", description: "Lists all draft orders." },
  perform: async (context, params) => {
    const { data } = await listDraftOrdersGql.perform(context, {
      shopifyConnection: params.shopifyConnection,
      limit: params.limit ? util.types.toInt(params.limit) : 50,
      getAlldata: params.getAlldata,
      endCursor: params.pageInfo || undefined,
    });
    return { data };
  },
  inputs: listDraftOrdersInputs,
  examplePayload: listDraftOrdersExamplePayload.restMap,
});
