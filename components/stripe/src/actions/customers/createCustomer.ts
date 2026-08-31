import { action, outputSchema } from "@prismatic-io/spectral";
import { createStripeClient } from "../../client";
import { createCustomerExamplePayload } from "../../examplePayloads/customers";
import { createCustomerInputs } from "../../inputs";
import { customerOutputSchema } from "../../outputSchemas";
export const createCustomer = action({
  display: {
    label: "Create Customer",
    description: "Create a new customer.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      contactInfo,
      address,
      customerBalance,
      customerPaymentId,
      customerDescription,
      customerMetadata,
      timeout,
      stripeConnection,
    },
  ) => {
    const client = createStripeClient({
      stripeConnection,
      timeout,
    });
    return {
      data: await client.customers.create(
        {
          ...(contactInfo.customerName && { name: contactInfo.customerName }),
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
          payment_method: customerPaymentId,
          description: customerDescription,
          email: contactInfo.customerEmail,
          metadata: customerMetadata,
        },
        { timeout },
      ),
    };
  },
  examplePerform: async (
    _context,
    {
      contactInfo,
      address,
      customerBalance,
      customerDescription,
      customerMetadata,
    },
  ): Promise<{
    data: unknown;
  }> => {
    const customer = createCustomerExamplePayload.data as Record<
      string,
      unknown
    >;
    return {
      data: {
        ...customer,
        name: contactInfo.customerName ?? null,
        email: contactInfo.customerEmail ?? null,
        phone: contactInfo.customerPhone ?? null,
        address: {
          city: address.customerCity ?? null,
          country: address.customerCountry ?? null,
          line1: address.customerAddress1 ?? null,
          line2: address.customerAddress2 ?? null,
          postal_code: address.customerPostal ?? null,
          state: address.customerState ?? null,
        },
        balance: customerBalance ?? 0,
        description: customerDescription ?? null,
        metadata: customerMetadata,
      },
    };
  },
  inputs: createCustomerInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: customerOutputSchema,
  }),
  examplePayload: createCustomerExamplePayload,
});
