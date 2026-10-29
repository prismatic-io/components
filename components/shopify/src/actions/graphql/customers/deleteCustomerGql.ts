import { action, outputSchema } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { deleteCustomerExamplePayload } from "../../../examplePayloads";
import { deleteCustomerInputs as inputs } from "../../../inputsGql";
import { deleteCustomerGqlOutputSchema } from "../../../outputSchemas";
import deleteCustomerQuery from "../queries/customers/DeleteCustomer.gql";

export const deleteCustomerGql = action({
  display: {
    label: "Delete Customer",
    description: "Deletes an existing customer.",
  },
  performSafety: "notAllowed",
  perform: async (context, { customerIdGql, shopifyConnection }) => {
    const client = getShopifyGraphQlClient(
      shopifyConnection,
      undefined,
      context.debug.enabled,
      context.logger,
    );
    await client.request(deleteCustomerQuery, {
      id: customerIdGql,
    });

    return {
      data: {},
    };
  },
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteCustomerGqlOutputSchema,
  }),
  examplePerform: async () => deleteCustomerExamplePayload.restMap,
  examplePayload: deleteCustomerExamplePayload.restMap,
});
