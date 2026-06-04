import { action, util } from "@prismatic-io/spectral";
import { listCustomersExamplePayload } from "../../examplePayloads";
import { listCustomersInputs } from "../../inputs";
import { listCustomersGql } from "../graphql/customers/listCustomers";

export const listCustomers = action({
  display: {
    label: "List Customers",
    description: "Lists all customers.",
  },
  perform: async (context, params) => {
    const { data } = await listCustomersGql.perform(context, {
      shopifyConnection: params.shopifyConnection,
      limit: params.limit ? util.types.toInt(params.limit) : 50,
      getAlldata: params.getAlldata,
      endCursor: params.pageInfo || undefined,
    });
    return { data };
  },
  inputs: listCustomersInputs,
  examplePayload: listCustomersExamplePayload.restMap,
});
