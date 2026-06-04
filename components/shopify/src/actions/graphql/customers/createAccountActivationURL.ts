import { action } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { createAccountActivationURLExamplePayload as examplePayload } from "../../../examplePayloads";
import { createAccountActivationURLInputs as inputs } from "../../../inputsGql";
import createAccountActivationURLQuery from "../queries/customers/CreateAccountActivationURL.gql";

export const createAccountActivationURLGql = action({
  display: {
    label: "Create Account Activation URL",
    description: "Creates an account activation URL for an existing customer.",
  },
  perform: async (context, { customerIdGql: customerId, shopifyConnection }) => {
    const client = getShopifyGraphQlClient(shopifyConnection, undefined, context.debug.enabled);
    const data: {
      customerGenerateAccountActivationUrl: Record<string, unknown>;
    } = await client.request(createAccountActivationURLQuery, {
      customerId,
    });

    return {
      data: data.customerGenerateAccountActivationUrl,
    };
  },
  inputs,
  examplePayload,
});
