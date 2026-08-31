import { action, outputSchema } from "@prismatic-io/spectral";
import { createStripeClient } from "../../client";
import { updateCardExamplePayload } from "../../examplePayloads/cards";
import { updateCardInputs } from "../../inputs";
import { paymentMethodOutputSchema } from "../../outputSchemas";
export const updateCard = action({
  display: {
    label: "Update Card",
    description: "Update an existing card by ID.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      paymentId,
      expMonth,
      expYear,
      billingAddress,
      contactInfo,
      metadata,
      stripeConnection,
      timeout,
    },
  ) => {
    const client = createStripeClient({
      stripeConnection,
      timeout,
    });
    return {
      data: await client.paymentMethods.update(paymentId, {
        card: {
          exp_month: expMonth,
          exp_year: expYear,
        },
        billing_details: {
          address: {
            city: billingAddress.billingCity,
            country: billingAddress.billingCountry,
            line1: billingAddress.billingAddress1,
            line2: billingAddress.billingAddress2,
            postal_code: billingAddress.postalCode,
            state: billingAddress.state,
          },
          email: contactInfo.billingEmail,
          name: contactInfo.billingName,
          phone: contactInfo.phone,
        },
        metadata,
      }),
    };
  },
  examplePerform: async (
    _context,
    { paymentId, expMonth, expYear, billingAddress, contactInfo, metadata },
  ): Promise<{
    data: unknown;
  }> => {
    const card = updateCardExamplePayload.data as Record<string, unknown>;
    const cardDetails = card.card as Record<string, unknown>;
    const billingDetails = card.billing_details as Record<string, unknown>;
    const address = billingDetails.address as Record<string, unknown>;
    return {
      data: {
        ...card,
        id: paymentId,
        card: {
          ...cardDetails,
          exp_month: expMonth,
          exp_year: expYear,
        },
        billing_details: {
          ...billingDetails,
          address: {
            ...address,
            city: billingAddress.billingCity ?? address.city,
            country: billingAddress.billingCountry ?? address.country,
            line1: billingAddress.billingAddress1 ?? address.line1,
            line2: billingAddress.billingAddress2 ?? address.line2,
            postal_code: billingAddress.postalCode ?? address.postal_code,
            state: billingAddress.state ?? address.state,
          },
          email: contactInfo.billingEmail ?? billingDetails.email,
          name: contactInfo.billingName ?? billingDetails.name,
          phone: contactInfo.phone ?? billingDetails.phone,
        },
        metadata,
      },
    };
  },
  inputs: updateCardInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: paymentMethodOutputSchema,
  }),
  examplePayload: updateCardExamplePayload,
});
