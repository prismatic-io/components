import { action, outputSchema } from "@prismatic-io/spectral";
import { createStripeClient } from "../../client";
import { createCardExamplePayload } from "../../examplePayloads/cards";
import { createCardInputs } from "../../inputs";
import { paymentMethodOutputSchema } from "../../outputSchemas";
export const createCard = action({
  display: {
    label: "Create Card",
    description: "Create a new card for a customer.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      customerId,
      cardNumber,
      expMonth,
      expYear,
      cvc,
      billingAddress,
      contactInfo,
      metadata,
      timeout,
      stripeConnection,
    },
  ) => {
    const client = createStripeClient({
      stripeConnection,
      timeout,
    });
    const paymentMethod = await client.paymentMethods.create({
      card: {
        exp_month: expMonth,
        exp_year: expYear,
        number: cardNumber,
        cvc: cvc,
      },
      type: "card",
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
    });
    return {
      data: customerId
        ? await client.paymentMethods.attach(paymentMethod.id, {
            customer: customerId,
          })
        : paymentMethod,
    };
  },
  examplePerform: async (
    _context,
    {
      customerId,
      cardNumber,
      expMonth,
      expYear,
      billingAddress,
      contactInfo,
      metadata,
    },
  ): Promise<{
    data: unknown;
  }> => {
    const card = createCardExamplePayload.data as Record<string, unknown>;
    const cardDetails = card.card as Record<string, unknown>;
    const billingDetails = card.billing_details as Record<string, unknown>;
    return {
      data: {
        ...card,
        card: {
          ...cardDetails,
          exp_month: expMonth,
          exp_year: expYear,
          last4: cardNumber.slice(-4),
        },
        billing_details: {
          ...billingDetails,
          address: {
            city: billingAddress.billingCity ?? null,
            country: billingAddress.billingCountry ?? null,
            line1: billingAddress.billingAddress1 ?? null,
            line2: billingAddress.billingAddress2 ?? null,
            postal_code: billingAddress.postalCode ?? null,
            state: billingAddress.state ?? null,
          },
          email: contactInfo.billingEmail ?? null,
          name: contactInfo.billingName ?? null,
          phone: contactInfo.phone ?? null,
        },
        metadata,
        customer: customerId ?? null,
      },
    };
  },
  inputs: createCardInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: paymentMethodOutputSchema,
  }),
  examplePayload: createCardExamplePayload,
});
