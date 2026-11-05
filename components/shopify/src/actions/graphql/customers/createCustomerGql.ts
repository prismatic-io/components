import { action } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { createCustomerGqlExamplePayload } from "../../../examplePayloads";
import { createCustomerInputs as inputs } from "../../../inputsGql";
import type { Customer } from "../../../types";
import { customerMapper } from "../../../util";
import createCustomerQuery from "../queries/customers/CreateCustomer.gql";

export const createCustomerGql = action({
  display: {
    label: "Create Customer",
    description: "Creates a new customer.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      shopifyConnection,
      firstName,
      lastName,
      email,
      addressListGql,
      phone,
      notes,
      additionalFields,
      tags,
      taxExempt,
      metafields,
    },
  ) => {
    const client = getShopifyGraphQlClient(
      shopifyConnection,
      undefined,
      context.debug.enabled,
      context.logger,
    );

    const data: { customerCreate: { customer: Customer } } = await client.request(
      createCustomerQuery,
      {
        input: {
          email,
          phone,
          firstName,
          lastName,
          note: notes,
          addresses: addressListGql,
          tags,
          taxExempt,
          metafields,
          ...additionalFields,
        },
      },
    );

    return {
      data: {
        customer: customerMapper(data.customerCreate.customer),
      },
    };
  },
  inputs,
  examplePerform: async () => createCustomerGqlExamplePayload.restMap,
  examplePayload: createCustomerGqlExamplePayload.restMap,
});
