import { action, util } from "@prismatic-io/spectral";
import { createStripeClient } from "../../auth";
import { createCardExamplePayload } from "../../examplePayloads/cards";
import {
  billingAddress1,
  billingAddress2,
  billingCity,
  billingCountry,
  billingEmail,
  billingName,
  cardNumber,
  connectionInput,
  customerId,
  cvc,
  expMonth,
  expYear,
  metadata,
  phone,
  postalCode,
  state,
  timeout,
} from "../../inputs";
import { keyValPairListToObject } from "../../util";

export const createCard = action({
  display: {
    label: "Create Card",
    description: "Create a new card for a customer.",
  },
  perform: async (
    context,
    {
      cardNumber,
      expMonth,
      expYear,
      cvc,
      billingAddress1,
      billingAddress2,
      billingCity,
      billingCountry,
      postalCode,
      state,
      billingEmail,
      billingName,
      phone,
      metadata,
      timeout,
      stripeConnection,
    },
  ) => {
    const client = createStripeClient({
      stripeConnection,
      timeout: util.types.toInt(timeout),
    });
    return {
      data: await client.paymentMethods.create({
        card: {
          exp_month: util.types.toInt(expMonth) || undefined,
          exp_year: util.types.toInt(expYear) || undefined,
          number: util.types.toString(cardNumber) || undefined,
          cvc: util.types.toString(cvc) || undefined,
        },
        type: "card",
        billing_details: {
          address: {
            city: util.types.toString(billingCity) || undefined,
            country: util.types.toString(billingCountry) || undefined,
            line1: util.types.toString(billingAddress1) || undefined,
            line2: util.types.toString(billingAddress2) || undefined,
            postal_code: util.types.toString(postalCode) || undefined,
            state: util.types.toString(state),
          },
          email: util.types.toString(billingEmail) || undefined,
          name: util.types.toString(billingName) || undefined,
          phone: util.types.toString(phone) || undefined,
        },
        metadata: keyValPairListToObject(metadata),
      }),
    };
  },
  inputs: {
    customerId,
    cardNumber,
    expMonth,
    expYear,
    cvc,
    billingAddress1,
    billingAddress2,
    billingCity,
    billingCountry,
    postalCode,
    state,
    billingEmail,
    billingName,
    phone,
    metadata,
    timeout,
    stripeConnection: connectionInput,
  },
  examplePayload: createCardExamplePayload,
});
