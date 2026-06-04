import { action } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { getCustomerExamplePayload } from "../../../examplePayloads";
import { getCustomerInputs as inputs } from "../../../inputsGql";
import type { Customer } from "../../interfaces/Customer";
import { customerMapper } from "../mappers/customerMapper";
import getCustomerQuery from "../queries/customers/GetCustomer.gql";

export const getCustomerGql = action({
  display: {
    label: "Get Customer",
    description: "Retrieves a customer by ID.",
  },
  perform: async (context, { customerIdGql, shopifyConnection }) => {
    const client = getShopifyGraphQlClient(shopifyConnection, undefined, context.debug.enabled);

    const data: { customer: Customer } = await client.request(getCustomerQuery, {
      id: customerIdGql,
    });

    return {
      data: {
        customer: customerMapper(data.customer),
      },
    };
  },
  inputs,
  examplePayload: getCustomerExamplePayload.restMap,
});
