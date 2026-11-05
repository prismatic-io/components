import { action, outputSchema, util } from "@prismatic-io/spectral";
import { DEFAULT_REST_PAGE_LIMIT } from "../../constants";
import { listCustomersExamplePayload } from "../../examplePayloads";
import { listCustomersInputs } from "../../inputs";
import { listCustomersOutputSchema } from "../../outputSchemas";
import { listCustomersGql } from "../graphql/customers/listCustomersGql";

export const listCustomers = action({
  display: {
    label: "List Customers",
    description: "Lists all customers.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const { data } = await listCustomersGql.perform(context, {
      shopifyConnection: params.shopifyConnection,
      pagination: {
        limit: params.pagination.limit
          ? util.types.toInt(params.pagination.limit)
          : DEFAULT_REST_PAGE_LIMIT,
        endCursor: params.pagination.pageInfo || undefined,
      },
      getAlldata: params.getAlldata,
    });
    return { data };
  },
  inputs: listCustomersInputs,
  outputSchema: outputSchema({ type: "actionOutput", schema: listCustomersOutputSchema }),
  examplePerform: async () => listCustomersExamplePayload.restMap,
  examplePayload: listCustomersExamplePayload.restMap,
});
