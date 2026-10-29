import { action, outputSchema, util } from "@prismatic-io/spectral";
import { listDraftOrdersExamplePayload } from "../../examplePayloads";
import { listDraftOrdersInputs } from "../../inputs";
import { listDraftOrdersOutputSchema } from "../../outputSchemas";
import { listDraftOrdersGql } from "../graphql/draftOrders/listDraftOrdersGql";

export const listDraftOrders = action({
  display: {
    label: "List Draft Orders",
    description: "Lists all draft orders.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const { data } = await listDraftOrdersGql.perform(context, {
      shopifyConnection: params.shopifyConnection,
      pagination: {
        limit: params.pagination.limit
          ? util.types.toInt(params.pagination.limit)
          : 50,
        endCursor: params.pagination.pageInfo || undefined,
      },
      getAlldata: params.getAlldata,
    });
    return { data };
  },
  inputs: listDraftOrdersInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listDraftOrdersOutputSchema,
  }),
  examplePerform: async () => listDraftOrdersExamplePayload.restMap,
  examplePayload: listDraftOrdersExamplePayload.restMap,
});
