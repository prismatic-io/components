import { action } from "@prismatic-io/spectral";
import { getShopifyClient } from "../../client";
import { createAccountActivationURLInputs } from "../../inputs";
import { createAccountActivationUrlExamplePayload } from "../../payloadExamples";

export const createAccountActivationURL = action({
  display: {
    label: "Create Account Activation URL (Deprecated)",
    description:
      "Create an account activation URL for an existing customer. This version of the action is being deprecated. Please replace action with Create Account Activation URL.",
  },
  perform: async (context, { customerId, shopifyConnection }) => {
    const client = getShopifyClient(shopifyConnection, undefined, context.debug.enabled);
    const { data } = await client.post(`/customers/${customerId}/account_activation_url.json`);
    return { data };
  },
  inputs: createAccountActivationURLInputs,
  examplePayload: { data: createAccountActivationUrlExamplePayload },
});
