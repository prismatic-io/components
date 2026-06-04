import { action, util } from "@prismatic-io/spectral";
import { createStripeClient } from "../../auth";
import { updateCustomerExamplePayload } from "../../examplePayloads/customers";
import {
  connectionInput,
  customerAddress1,
  customerAddress2,
  customerBalance,
  customerCity,
  customerCountry,
  customerDescription,
  customerEmail,
  customerId,
  customerMetadata,
  customerName,
  customerPhone,
  customerPostal,
  customerState,
  fieldValues,
  timeout,
} from "../../inputs";
import { keyValPairListToObject } from "../../util";

export const updateCustomer = action({
  display: {
    label: "Update Customer",
    description: "Update an existing customer.",
  },
  perform: async (
    context,
    {
      customerName,
      customerId,
      customerPhone,
      customerAddress1,
      customerAddress2,
      customerCity,
      customerCountry,
      customerPostal,
      customerState,
      customerBalance,
      customerDescription,
      customerEmail,
      customerMetadata,
      timeout,
      fieldValues,
      stripeConnection,
    },
  ) => {
    const client = createStripeClient({
      stripeConnection,
      timeout: util.types.toInt(timeout),
    });

    const data = await client.customers.update(util.types.toString(customerId), {
      name: util.types.toString(customerName) || undefined,
      phone: util.types.toString(customerPhone) || undefined,
      address: {
        line1: util.types.toString(customerAddress1) || undefined,
        city: util.types.toString(customerCity) || undefined,
        country: util.types.toString(customerCountry) || undefined,
        line2: util.types.toString(customerAddress2) || undefined,
        postal_code: util.types.toString(customerPostal) || undefined,
        state: util.types.toString(customerState) || undefined,
      },
      
      balance: util.types.toInt(customerBalance) * 100 || undefined,
      description: util.types.toString(customerDescription) || undefined,
      email: util.types.toString(customerEmail) || undefined,
      metadata: keyValPairListToObject(customerMetadata) || undefined,
      ...(util.types.keyValPairListToObject(fieldValues) || undefined),
    });

    return {
      data,
    };
  },
  inputs: {
    customerId: { ...customerId, required: false },
    customerName,
    customerPhone,
    customerAddress1,
    customerAddress2,
    customerCity,
    customerCountry,
    customerPostal,
    customerState,
    customerBalance,
    customerDescription,
    customerEmail,
    fieldValues,
    customerMetadata,
    timeout,
    stripeConnection: connectionInput,
  },
  examplePayload: updateCustomerExamplePayload,
});
