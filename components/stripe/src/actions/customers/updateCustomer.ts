import { action, outputSchema } from "@prismatic-io/spectral";
import { createStripeClient } from "../../client";
import { updateCustomerExamplePayload } from "../../examplePayloads/customers";
import { updateCustomerInputs } from "../../inputs";
import { customerOutputSchema } from "../../outputSchemas";
export const updateCustomer = action({
  display: {
    label: "Update Customer",
    description: "Update an existing customer.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      customerId,
      contactInfo,
      address,
      customerBalance,
      customerDescription,
      customerMetadata,
      timeout,
      fieldValues,
      stripeConnection,
    },
  ) => {
    if (!customerId) {
      throw new Error("Customer ID is required to update a customer.");
    }
    const client = createStripeClient({
      stripeConnection,
      timeout,
    });
    const data = await client.customers.update(customerId, {
      name: contactInfo.customerName,
      phone: contactInfo.customerPhone,
      address: {
        line1: address.customerAddress1,
        city: address.customerCity,
        country: address.customerCountry,
        line2: address.customerAddress2,
        postal_code: address.customerPostal,
        state: address.customerState,
      },
      balance: customerBalance,
      description: customerDescription,
      email: contactInfo.customerEmail,
      metadata: customerMetadata,
      ...fieldValues,
    });
    return {
      data,
    };
  },
  examplePerform: async (
    _context,
    {
      customerId,
      contactInfo,
      address,
      customerBalance,
      customerDescription,
      customerMetadata,
    },
  ): Promise<{
    data: unknown;
  }> => {
    const customer = updateCustomerExamplePayload.data as Record<
      string,
      unknown
    >;
    const existingAddress = customer.address as Record<string, unknown>;
    return {
      data: {
        ...customer,
        id: customerId ?? customer.id,
        name: contactInfo.customerName ?? customer.name,
        email: contactInfo.customerEmail ?? customer.email,
        phone: contactInfo.customerPhone ?? customer.phone,
        address: {
          ...existingAddress,
          city: address.customerCity ?? existingAddress.city,
          country: address.customerCountry ?? existingAddress.country,
          line1: address.customerAddress1 ?? existingAddress.line1,
          line2: address.customerAddress2 ?? existingAddress.line2,
          postal_code: address.customerPostal ?? existingAddress.postal_code,
          state: address.customerState ?? existingAddress.state,
        },
        balance: customerBalance ?? customer.balance,
        description: customerDescription ?? customer.description,
        metadata: customerMetadata,
      },
    };
  },
  inputs: updateCustomerInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: customerOutputSchema,
  }),
  examplePayload: updateCustomerExamplePayload,
});
