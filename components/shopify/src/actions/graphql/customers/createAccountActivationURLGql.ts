import { action, outputSchema } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { createAccountActivationURLExamplePayload as examplePayload } from "../../../examplePayloads";
import { createAccountActivationURLInputs as inputs } from "../../../inputsGql";
import { createAccountActivationURLGqlOutputSchema } from "../../../outputSchemas";
import createAccountActivationURLQuery from "../queries/customers/CreateAccountActivationURL.gql";

export const createAccountActivationURLGql = action({
  display: {
    label: "Create Account Activation URL",
    description: "Creates an account activation URL for an existing customer.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { customerIdGql: customerId, shopifyConnection },
  ) => {
    const client = getShopifyGraphQlClient(
      shopifyConnection,
      undefined,
      context.debug.enabled,
      context.logger,
    );
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
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createAccountActivationURLGqlOutputSchema,
  }),
  examplePerform: async () => examplePayload,
  examplePayload,
});
