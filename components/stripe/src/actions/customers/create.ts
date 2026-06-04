import { action, util } from "@prismatic-io/spectral";
import { createStripeClient } from "../../auth";
import { createCustomerExamplePayload } from "../../examplePayloads/customers";
import {
  connectionInput,
  customerAddress1,
  customerAddress2,
  customerBalance,
  customerCity,
  customerCountry,
  customerDescription,
  customerEmail,
  customerMetadata,
  customerName,
  customerPaymentId,
  customerPhone,
  customerPostal,
  customerState,
  timeout,
} from "../../inputs";
import { keyValPairListToObject } from "../../util";

export const createCustomer = action({
  display: {
    label: "Create Customer",
    description: "Create a new customer.",
  },
  perform: async (
    context,
    {
      customerName,
      customerPhone,
      customerAddress1,
      customerAddress2,
      customerCity,
      customerCountry,
      customerPostal,
      customerState,
      customerBalance,
      customerPaymentId,
      customerDescription,
      customerEmail,
      customerMetadata,
      timeout,
      stripeConnection,
    },
  ) => {
    const client = createStripeClient({
      stripeConnection,
      timeout: util.types.toInt(timeout),
    });
    return {
      data: await client.customers.create(
        {
          name: util.types.toString(customerName),
          phone: util.types.toString(customerPhone) || undefined,
          address: {
            line1: util.types.toString(customerAddress1) || undefined,
            city: util.types.toString(customerCity) || undefined,
            country: util.types.toString(customerCountry) || undefined,
            line2: util.types.toString(customerAddress2) || undefined,
            postal_code: util.types.toString(customerPostal) || undefined,
            state: util.types.toString(customerState) || undefined,
          },
          
          balance: util.types.toInt(customerBalance) * 100,
          payment_method: util.types.toString(customerPaymentId) || undefined,
          description: util.types.toString(customerDescription) || undefined,
          email: util.types.toString(customerEmail) || undefined,
          metadata: keyValPairListToObject(customerMetadata) || undefined,
        },
        { timeout: util.types.toInt(timeout) },
      ),
    };
  },
  inputs: {
    customerName,
    customerPhone,
    customerAddress1,
    customerAddress2,
    customerCity,
    customerCountry,
    customerPostal,
    customerState,
    customerBalance,
    customerPaymentId,
    customerDescription,
    customerEmail,
    customerMetadata,
    timeout,
    stripeConnection: connectionInput,
  },
  examplePayload: createCustomerExamplePayload,
});
