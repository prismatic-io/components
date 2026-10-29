import { action, outputSchema, util } from "@prismatic-io/spectral";
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
          : 50,
        endCursor: params.pagination.pageInfo || undefined,
      },
      getAlldata: params.getAlldata,
    });
    return { data };
  },
  inputs: listCustomersInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listCustomersOutputSchema,
  }),
  examplePerform: async () => listCustomersExamplePayload.restMap,
  examplePayload: listCustomersExamplePayload.restMap,
});
